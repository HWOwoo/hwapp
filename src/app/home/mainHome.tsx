"use client";

import React, { useState } from "react";
import Image from 'next/image';

const MainHome = () => {

  const itemsPerPage = 10;
  const totalItems = 50;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  
  
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
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

  const displayedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
    <div className="bg-gray-100 flex justify-center min-h-screen">
      <div className="w-full max-w-5xl bg-white min-h-screen flex flex-col">
        {/* 네비게이션 바 */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center h-12">
          <h1 className="flex text-2xl font-bold text-gray-800 !p-14">Hwapp</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              value="tbone"
              disabled
              className="invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
            />
            <button className="bg-gray-800 text-white px-3 py-1 rounded-md">
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
        <div className="flex justify-center items-center space-x-12 h-12 ">
          <a href="#" className="inline-flex w-32 px-4 py-2 text-blue-600 border-b-2 border-blue-500 font-semibold">
            통합
          </a>
          <a href="#" className="inline-flex w-32 px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500 transition">
            아카라이브
          </a>
          <a href="#" className="inline-flex w-32 px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500 transition">
            뽐뿌
          </a>
          <a href="#" className="inline-flex w-32 px-4 py-2 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-blue-500 transition">
            퀘이사존
          </a>
        </div>

        {/* 특가 상품 리스트 */}
        <section className="py-12 px-6 flex-grow bg-gray-100 flex justify-center">
      <div className="flex flex-col gap-4 items-center w-full max-w-4xl">
      {displayedItems.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-8 border border-gray-200 hover:border-blue-400 w-full">
            <div className="w-36 h-36 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              <Image 
                src={`/images/${("0" + item.id).slice(-2)}.png`} 
                width={120} 
                height={120} 
                alt="상품 이미지" 
                className="rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105" 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600">가격: {item.price}</p>
              <p className="text-gray-500">카테고리: {item.category}</p>
              <p className="text-gray-500">출처: {item.source}</p>
              <p className="text-gray-400 text-sm">업로드 시간: {item.timestamp}</p>
              <button 
                className="mt-4 bg-blue-500 text-white !px-1.5 !py-1 rounded-lg inline-block shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105"
              >
                상품 링크 아이콘
              </button>
            </div>
          </div>
        ))}
      
      <div className="flex space-x-2 !mt-8 !mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="!px-3 !py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`!px-3 !py-1 rounded-md ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="!px-3 !py-1 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>

        {/* 푸터 */}
        <footer className="bg-gray-800 text-white text-center py-6 mt-12">
          <p>&copy; 2025 DealFinder. 모든 권리 보유.</p>
        </footer>
      </div>
    </div>
        </>
    )
}

export default MainHome;