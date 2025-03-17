    import { useState } from "react";

    interface WriteModalProps {
        visible: boolean;
        onClose: () => void;
    }

    const boardCreate = ({ visible, onClose }: WriteModalProps) => {
        if (!visible) {
            return null;
        }

        const [formData, setFormData] = useState({
            creater: "",
            title: "",
            link: "",
            price: "",
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        
        const handleSubmit = async () => {
            try {
            const response = await fetch("http://localhost:3000/board/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        
            if (!response.ok) { 
                throw new Error("서버 응답 오류");
            }
            onClose(); // 모달 닫기

            } catch (error) {
            console.error("데이터 전송 실패:", error);
            }

        };

        return (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20" >
        {/* 모달 박스 */}
        <div className="bg-white !p-6 rounded-lg shadow-md w-full max-w-md animate-fadeIn border-1 inset-0 z-99">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            특가 정보 등록
            </h2>

        {/* 입력 필드 */}
            <div className="space-y-4">
            <input
                type="text"
                name="creater"
                placeholder="작성자"
                value={formData.creater}
                onChange={handleChange}
                className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            /> {/* TODO 로그인 데이터 사용할 예정 */}
            <input
                type="text"
                name="title"
                placeholder="상품 제목"
                value={formData.title}
                onChange={handleChange}
                className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
            <input
                type="text"
                name="price"
                placeholder="가격 (예: 30,000원)"
                value={formData.price}
                onChange={handleChange}
                className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
            <input
                type="text"
                name="link"
                placeholder="구매 링크"
                value={formData.link}
                onChange={handleChange}
                className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition !mb-3"
            />
            </div>


            {/* 버튼 영역 */}
            <div className="flex justify-between items-center mt-6">
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 !px-5 !py-2 rounded-lg hover:bg-gray-400 transition duration-200"
            >
                취소
            </button>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white !px-5 !py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                등록하기
            </button>
            </div>
        </div>
        </div>
        );
    }

    export default boardCreate;