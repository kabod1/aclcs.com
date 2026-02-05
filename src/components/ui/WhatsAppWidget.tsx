"use client";

import { useState } from "react";
import { WHATSAPP_LINK } from "@/lib/utils";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-navy-100 w-80 overflow-hidden animate-scale-in origin-bottom-right">
          <div className="bg-[#075e54] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm">ACLCS Corporate Services</p>
              <p className="text-green-200 text-xs">Typically replies within minutes</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-5 bg-[#ece5dd]">
            <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
              <p className="text-sm text-gray-800">
                Hello! 👋 How can we help you with company formation in Cyprus?
              </p>
              <p className="text-[10px] text-gray-400 mt-1 text-right">Just now</p>
            </div>
          </div>
          <div className="p-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25d366] text-white font-semibold rounded-xl hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle size={18} />
              Start Chat
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg shadow-[#25d366]/30 hover:shadow-xl hover:shadow-[#25d366]/40 hover:scale-105 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
