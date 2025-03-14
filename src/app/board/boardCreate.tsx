import { useState } from "react";

interface WriteModalProps {
    visible: boolean;
    onClose: () => void;
}

const boardCreate = ({ visible, onClose }: WriteModalProps) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white !p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">새로운 상품 작성하기</h2>

                {/* 입력 필드 */}
                <input type="text" placeholder="제목" className="w-full !p-2 border border-gray-300 rounded-lg mb-4" />
                <input type="text" placeholder="가격" className="w-full !p-2 border border-gray-300 rounded-lg mb-4" />
                <input type="text" placeholder="링크 주소" className="w-full !p-2 border border-gray-300 rounded-lg mb-4" />

                {/* 확인 및 취소 버튼 */}
                <div className="flex justify-end space-x-3">
                    <button className="bg-gray-400 text-white !px-4 !py-2 rounded-lg" onClick={onClose}> {/* 👈 onClose 사용 */}
                        취소
                    </button>
                    <button className="bg-blue-500 text-white !px-4 !py-2 rounded-lg">
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
}

export default boardCreate;