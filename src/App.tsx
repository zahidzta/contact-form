import Form from "./components/Form"
import { useLanguage } from "./context/LanguageContext"
import { IoLanguage } from "react-icons/io5"

function App() {
  const { toggleLanguage, language } = useLanguage();

  return (
    <main className="min-h-screen w-full bg-green-200 flex items-center justify-center p-4 sm:p-8 font-sans relative">
      <button 
        onClick={toggleLanguage}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white p-3 rounded-full shadow-sm text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
        aria-label="Toggle language"
        title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
      >
        <IoLanguage size={24} />
        <span className="font-bold text-sm uppercase">{language}</span>
      </button>
      <Form />
    </main>
  )
}

export default App
