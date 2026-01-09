import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBack, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login delay
    setTimeout(() => {
        onLogin();
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex min-h-screen w-full bg-white text-black font-sans"
    >
       {/* Left Panel - Artistic Background */}
       <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden flex-col justify-between p-16 text-white">
          {/* Abstract Fluid Gradients */}
          <div className="absolute inset-0 z-0 bg-black">
             {/* Top Pink/Purple Wave */}
             <div className="absolute top-[-20%] left-[-10%] w-[90%] h-[80%] bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full blur-[130px] opacity-70 animate-pulse-slow" />
             
             {/* Middle Violet/Blue */}
             <div className="absolute top-[30%] right-[-20%] w-[80%] h-[80%] bg-violet-700 rounded-full blur-[120px] opacity-60" />
             
             {/* Bottom Cyan/Blue Wave */}
             <div className="absolute bottom-[-20%] left-[-10%] w-[100%] h-[70%] bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full blur-[100px] opacity-80" />
             
             {/* Overlay Mesh for texture (simulated with noise or subtle lines if needed, but blur is sufficient for the 'vibe') */}
             <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          </div>
          
          {/* Top Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
               <div className="h-px w-12 bg-white/50"></div>
               <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">A Wise Quote</span>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 mb-8">
            <h1 className="text-6xl xl:text-7xl font-serif leading-[1.1] mb-8 tracking-wide">
              Get <br/>
              <span className="italic font-light opacity-90">Everything</span> <br/>
              You Want
            </h1>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed tracking-wide">
               You can get everything you want if you work hard, trust the process, and stick to the plan.
            </p>
          </div>
       </div>

       {/* Right Panel - Auth Form */}
       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative">
          
          {/* Back Button (Mobile only) */}
          <button 
            onClick={onBack} 
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors lg:hidden"
          >
             <ArrowLeft size={24} />
          </button>

          {/* Logo Area */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 flex items-center gap-2 cursor-pointer" onClick={onBack}>
             <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                 <div className="w-3 h-3 border-2 border-white rounded-full"></div>
             </div>
             <span className="font-semibold text-lg tracking-tight">MW Policy</span>
          </div>

          <div className="w-full max-w-[400px] mt-10 lg:mt-0">
             <div className="text-center mb-10">
                <h2 className="text-4xl font-serif mb-3 text-gray-900 tracking-tight">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-sm">
                   {isLogin 
                     ? 'Enter your email and password to access your account' 
                     : 'Enter your details to register a new account'}
                </p>
             </div>

             <form className="space-y-5" onSubmit={handleSubmit}>
                <AnimatePresence mode='popLayout'>
                    {!isLogin && (
                       <motion.div 
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         className="space-y-1 overflow-hidden"
                       >
                          <label className="text-sm font-semibold text-gray-700 ml-1">Username</label>
                          <input 
                            name="username"
                            type="text" 
                            placeholder="Enter your username" 
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-gray-200 outline-none transition-all placeholder:text-gray-400 text-sm" 
                          />
                       </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-gray-200 outline-none transition-all placeholder:text-gray-400 text-sm" 
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                    <div className="relative">
                        <input 
                          name="password"
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-gray-200 outline-none transition-all placeholder:text-gray-400 text-sm pr-10" 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                           {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {isLogin && (
                   <div className="flex justify-between items-center text-xs pt-1">
                      <label className="flex items-center gap-2 text-gray-600 cursor-pointer select-none">
                         <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black w-4 h-4" />
                         Remember me
                      </label>
                      <button type="button" className="font-semibold text-gray-900 hover:underline">Forgot Password</button>
                   </div>
                )}

                <button className="w-full bg-black text-white py-4 rounded-xl font-semibold text-sm tracking-wide shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 mt-4">
                   {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
             </form>

             <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                   {isLogin ? "Don't have an account?" : "Already have an account?"}
                   <button 
                     onClick={() => setIsLogin(!isLogin)} 
                     className="ml-1 font-bold text-black hover:underline focus:outline-none"
                   >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                   </button>
                </p>
             </div>
          </div>
       </div>
    </motion.div>
  )
}