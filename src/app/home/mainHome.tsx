"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';

const MainHome = () => {

  const itemsPerPage = 10;
  const totalItems = 50;
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSource, setSelectedSource] = useState('통합');
  const [itemsAPI, setItemsAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/board/all?limit=${itemsPerPage}&page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error("서버 응답 오류");
        }

        const data = await response.json();
        console.log("받아온 데이터:", data);
        setItemsAPI(data);

      } catch (error) {
        console.error("데이터를 받아오는데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [currentPage]); // currentPage가 변경될때마다 실행됨.

  // 페이지 변경 함수
  const handlePageChange = (page: number) => {
    if (page >= 1) {
      console.log(`페이지 변경: ${page}`);
      setCurrentPage(page);
    }
  };


  const items = Array.from({ length: totalItems }, (_, i) => ({
    id: i + 1,
    title: `특가 상품 ${i + 1}`,
    price: (Math.random() * 100000).toFixed(0) + '원',
    category: ['가전', '의류', '식품', '가구', '뷰티'][i % 5],
    source: ['아카라이브', '뽐뿌', '퀘이사존'][i % 3],
    timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
  }));

  const filteredItems = selectedSource === '통합' ? items : items.filter(item => item.source === selectedSource);
  const displayedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

        {/* 카테고리 리스트 */}
        <div className="flex justify-center items-center space-x-12 h-12">
          {['통합', '아카라이브', '뽐뿌', '퀘이사존'].map(source => (
            <button 
              key={source} 
              onClick={() => {
                console.log(`선택된 소스: ${source}`);
                setSelectedSource(source);
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
        {displayedItems.map((item) => (
          <div key={item.id} className="bg-white !p-1.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex gap-3 border border-gray-200 hover:border-blue-400 w-full">
            <div className="w-36 h-36 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              <Image 
                src={`/images/${("0" + item.id).slice(-2)}.png`} 
                width={120} 
                height={120} 
                alt="상품 이미지" 
                className="rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105" 
              />
            </div>
            <div className="flex-1 !mt-4">
              <h3 className="text-lg font-semibold text-gray-800 col-span-2">{item.title}</h3>
              <p className="text-gray-600">{item.price}</p>
              <p className="text-gray-400">{item.timestamp}</p>
              <div className="col-span-2 flex justify-start">
                <button 
                  className="bg-blue-500 text-white !px-2.5 !py-1 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>상품 이동</span>
                </button>
              </div>
            </div>
            <p className="text-gray-500">{item.source}</p>
          </div>
        ))}
      
      <div className="flex space-x-2 !mt-8 !mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="!px-3 !py-1 text-gray-700 rounded-md disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`!px-3 !py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : ' text-gray-700'}`}
            >
              {page}
            </button>
          ))}
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
      </div>
    </div>
        </>
    )
}

export default MainHome;