import React from 'react';
import { Cog, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] bg-[#0A1628] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-[4px] bg-[#132238] text-blue-500 border border-blue-500/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <Cog className="w-8 h-8 animate-[spin_10s_linear_infinite]" />
        </div>

        <div>
          <span className="text-4xl font-black text-blue-500 tracking-tight">404</span>
          <h1 className="text-2xl font-black text-white mt-1">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            The machinery page or technical document you requested does not exist or has been moved.
          </p>
        </div>

        <div>
          <Button to="/" variant="primary" icon={ArrowLeft}>
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
