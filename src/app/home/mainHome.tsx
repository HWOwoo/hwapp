"use client";

import React from "react";
import Image from 'next/image';

const MainHome = () => {
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
    <section className="py-12 px-6 flex-grow bg-gray-100">
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-6 border border-gray-200 hover:border-blue-400">
            <Image 
              src={`/images/${"0" + item}.png`} 
              width={100} 
              height={100} 
              alt="상품 이미지" 
              className="rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105" 
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">특가 상품 {item}</h3>
              <p className="text-gray-500 mt-2">최저가 확인 가능</p>
              <a 
                href="#" 
                className="mt-2 bg-blue-500 text-white px-5 py-2 rounded-md inline-block shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105"
              >
                상품 링크 이동
              </a>
            </div>
          </div>
        ))}
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