"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import BoardCreate from "../board/boardCreate";
import AiResult from "../board/aiReuslt"
import { MoonLoader } from "react-spinners";

/* Model */
interface Product {
  id: number;
  site: string;
  title: string;
  link: string;
  price: string;
  createAt: string;
  aiContent: string;
}

/* Model */

const MainHome = () => {

  
  /* state 지정 */
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedSource, setSelectedSource] = useState('통합'); // 선택된 사이트
  const [itemsAPI, setItemsAPI] = useState<Product[]>([]); // API로 받아온 상품 리스트
  const [totalItems, setTotalItems] = useState(0); // 리스트 아이템 전체개수
  const [isModalOpen, setIsModalOpen] = useState(false); // 등록 모달 상태 추가가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [isAiModalOpen, setIsAiModalOpen] = useState(false); // PRE 모달 상태 추가
  const [aiResult, setAiResult] = useState(""); // PRE 분석 결과 저장
  const [isLoadding, setIsLoadding] = useState(false);

  /* 변수지정 */
  const itemsPerPage = 10;  
  const maxPageButtons = 10; // 한 번에 보여줄 최대 페이지 개수
  const totalPages = Math.ceil(totalItems / itemsPerPage); // 전체 페이지 수 계산
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2)); // 시작 페이지
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1); // 끝 페이지

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sourceParam = selectedSource === '통합' ? '' : `&site=${selectedSource}`; // "통합"이면 필터링 안함
        const response = await fetch(`http://localhost:3000/board/all?limit=${itemsPerPage}&page=${currentPage}${sourceParam}`);

        if (!response.ok) throw new Error("서버 응답 오류");
        const data: Product[] = await response.json();

        console.log("받아온 데이터:", data);
        setItemsAPI(data);
      } catch (error) {
        console.error("데이터를 받아오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [currentPage, selectedSource]); // 변경될때마다 실행됨

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/board/count?site=${selectedSource}`);
        if (!response.ok) throw new Error("서버 응답 오류");
        const count = await response.json();
        setTotalItems(count.count);
      } catch (error) {
        console.error("전체 개수를 가져오는데 실패했습니다.", error);
      }
    };

    fetchTotalCount();
  }, []);


  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 1) {
      console.log(`페이지 변경: ${page}`);
      setCurrentPage(page);
    }
  };

  const callPerplexity = async (query: string) => {
    setIsLoadding(true);
    const API_URL = "https://api.perplexity.ai/chat/completions";
    const BEARER_TOKEN = process.env.NEXT_PUBLIC_BEARER_TOKEN;
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          model: "sonar-pro",
          messages: [
            { role: "system", content: "평소 가격 범위, 어느정도 가격대를 형성하고 있는 물품인지 알려줘" },
            { role: "user", content: query + " 가격" },
          ],
          max_tokens: 1024,
          temperature: 0.2,
          top_p: 0.9,
          return_citations: false,
          search_domain_filter: ["naver.com"],
          return_images: false,
          return_related_questions: false,
          search_recency_filter: "month",
          top_k: 0,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Perplexity API 오류");
      }

      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || "AI 분석 결과 없음";

      return aiContent;
    } catch (error) {
      console.error("AI 분석 실패:", error);
      return "AI 분석 실패";
    } finally {
      setIsLoadding(false); // 로딩 종료
    }
  }

  const aiUpdate = async ( link : string, title : string ) => {
    const aiContent = await callPerplexity(title);

    try {
      const response = await fetch("http://localhost:3000/board/updateAi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, aiContent }),
      });

      if (!response.ok) throw new Error("서버 응답 오류");

      handleOpenModal(link);
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("업데이트 중 오류 발생");
    }
  }

  const handleOpenModal = async (link:string) => {
    try{
      const response = await fetch("http://localhost:3000/board/readAiContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });

      const data = await response.json();

      setAiResult(data.aiContent || 'Not DATA');
      setIsAiModalOpen(true);

    } catch (error) {
      console.log('Error')
    }
  }

  return (
    <>
      <div className="bg-gray-100 flex justify-center min-h-screen">
        <div className="w-full max-w-5xl bg-white min-h-screen flex flex-col">
          {/* 네비게이션 바 */}
          <nav className="bg-white shadow-md p-4 flex justify-between items-center h-12">
            <h1 className="flex text-2xl font-bold text-gray-800 !p-14">Hwapp</h1>
            <div className="relative w-full max-w-lg !px-1">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="w-full !p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white !px-2 !py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                검색
              </button>
            </div>
          </nav>

          {/* 히어로 섹션 */}
          <div className="relative bg-cover bg-center h-80 flex items-center justify-center"
            style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900?shopping-deals')" }}>
            <div className="bg-opacity-50 p-6 rounded-lg text-center">
              <h2 className="text-4xl font-bold">최고의 특가를 찾아보세요!</h2>
            </div>
          </div>

          <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white rounded-md !px-3 !py-2 shadow-md"
            >
              상품 등록
            </button>

          {/* 카테고리 리스트 */}
          <div className="flex justify-center items-center space-x-12 h-12">
            {["통합", "Arca", "PPomppu", "Quasar"].map(source => (
              <button
                key={source}
                onClick={() => {
                  console.log(`선택된 소스: ${source}`);
                  setSelectedSource(source);
                  setCurrentPage(1);
                }}
                className={`inline-flex w-32 px-4 py-2 border-b-2 font-semibold transition ${selectedSource === source ? 'text-blue-600 border-blue-500' : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-blue-500'}`}
              >
                {source}
              </button>
            ))}
          </div>

          {/* 특가 상품 리스트 */}
          <section className="!py-4 !px-6 flex-grow bg-gray-100 flex justify-center">
            <div className="flex flex-col gap-4 items-center w-full max-w-4xl">
              {itemsAPI.map((item) => (
                <div key={item.id} className="bg-white !p-1.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex gap-3 border border-gray-200 hover:border-blue-400 w-full">
                  <div className="w-36 h-36 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={
                        item.site === "Arca"
                        ? "/images/ARCA.png"
                        : item.site === "PPomppu"
                        ? "/images/PPOMP.png"
                        : item.site === "Quasar"
                        ? "/images/QUSARA.png"
                        : "/images/ARCA.png"
                      }
                      width={120}
                      height={120}
                      alt="상품 이미지"
                      className="rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 !mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 col-span-2">{item.title}</h3>
                    <p className="text-gray-600">{item.price}</p>
                    <p className="text-gray-400">{item.createAt}</p>
                    <div className="col-span-2 flex justify-start">
                      <button
                        onClick={() => window.open(item.link, '_blank')}
                        className="bg-blue-500 text-white !px-2.5 !py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <span>상품 이동</span>
                      </button>
                      |
                      <button
                        onClick={() => item.aiContent ? handleOpenModal(item.link) : aiUpdate(item.link, item.title)}
                        className="bg-blue-500 text-white !px-2.5 !py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        disabled={isLoading}
                      >
                        <span>상품 분석</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500">{item.site}</p>
                </div>
              ))}

              {/* 페이지네이션 */}
              <div className="flex space-x-2 !mt-8 !mb-8">
                {/* 이전 페이지 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="!px-3 !py-1 text-gray-700 rounded-md disabled:opacity-50"
                >
                  &lt;
                </button>

                {/* 페이지 번호 리스트 */}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`!px-3 !py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : ' text-gray-700'}`}
                  >
                    {page}
                  </button>
                ))}

                {/* 다음 페이지 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="!px-3 !py-1 text-gray-700 rounded-md disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          </section>

          {/* 푸터 */}
          <footer className="bg-gray-800 text-white text-center py-6 mt-12 h-16">
            <p>&copy; 2025 HAM. 모든 권리 보유.</p>
          </footer>

           {/* 등록 모달 컴포넌트 */}
           <BoardCreate visible={isModalOpen} onClose={() => setIsModalOpen(false)} /> 
           <AiResult visible={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} aiContent={aiResult} />
            {isLoadding ?   
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <MoonLoader size={80} color="#ffffff" />
        </div> : ''}
            
        </div>
      </div>
      
    </>
  )
}

export default MainHome;