import CurrencySelector from './CurrencySelector';
import logo from '../assets/logo.png';

interface HeaderProps {
  userName?: string;
  onLogout?: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function Header({ userName = "Otávio Oliveira", onLogout, currency, onCurrencyChange }: HeaderProps) {

  return (
    <>
    <header className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-200 w-full py-2">
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Oliveira Trust" className="h-8" />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-text-primary mr-6">{userName}</span>
            <button 
              onClick={onLogout}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
             
      <div className="flex justify-end max-w-[1200px] mx-auto px-3 ">
        <CurrencySelector
          selectedCurrency={currency}
          onCurrencyChange={onCurrencyChange}
        />
      </div>
    </>
  );
}
