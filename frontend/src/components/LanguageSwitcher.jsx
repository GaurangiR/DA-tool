import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <div className="flex items-center px-4 py-2 bg-white border-none rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
        <FaGlobe className="text-blue-600 text-sm" />
        <select
          value={i18n.language}
          onChange={changeLanguage}
          className="bg-transparent appearance-none outline-none text-sm font-semibold text-gray-800 px-2 cursor-pointer text-center"
        >
          <option className="text-center px-2" value="en">English</option>
          <option className="text-center px-2" value="hi">हिन्दी</option>
          <option className="text-center px-2" value="fr">Français</option>
          <option className="text-center px-2" value="es">Español</option>
          <option className="text-center px-2" value="de">Deutsch</option>
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="12"
          height="8"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5 5L9 1" stroke="#555" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
