import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, Cog, Eye, EyeOff, Lock } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLoginPage() {
  const { isAdminLoggedIn, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  if (isAdminLoggedIn) return <Navigate to="/admin" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!event.currentTarget.reportValidity()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Unable to continue. Please check your details.');
    } finally { setLoading(false); }
  }

  return <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-[#132238] rounded-lg p-7 sm:p-8 border border-[#1E3554]/70 shadow-2xl">
      <div className="flex items-center gap-3 pb-6 border-b border-[#1E3554]"><Cog className="w-9 h-9 text-blue-500" /><div><h1 className="text-xl font-black text-white">TOP ENGINEERS</h1><p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Admin & Management Portal</p></div></div>
      <div className="mt-5 rounded border border-amber-700/50 bg-amber-950/30 p-3 text-xs text-amber-200">Frontend demonstration only. This form does not authenticate users; Supabase Auth is not connected.</div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded border border-[#1E3554] bg-[#0A1628] px-3.5 py-3 text-sm text-white focus:border-blue-500 focus:outline-none" /></label>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">Password<span className="relative mt-2 block"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" minLength="6" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded border border-[#1E3554] bg-[#0A1628] px-3.5 py-3 pr-12 text-sm text-white focus:border-blue-500 focus:outline-none" /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-white">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></span></label>
        {error && <p role="alert" className="flex items-center gap-2 text-sm text-red-300"><AlertCircle className="w-4 h-4" />{error}</p>}
        <button type="submit" disabled={loading} className="w-full inline-flex justify-center items-center gap-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-3 font-semibold text-white"><Lock className="w-4 h-4" />{loading ? 'Signing in…' : 'Continue to Demo Dashboard'}</button>
      </form>
      <Link to="/" className="block mt-6 text-center text-xs text-slate-400 hover:text-white">Return to Top Engineers Home</Link>
    </div>
  </div>;
}
