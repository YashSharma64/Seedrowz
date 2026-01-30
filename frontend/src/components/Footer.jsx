import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FFF2E4] py-16 px-8 border-t border-orange-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-orange-500">
                <img src="/new.png" alt="Seedrowz logo" className="h-8 object-contain" />
              </div>
            </div>
            <p className="text-orange-900/70 font-medium max-w-xs leading-relaxed">
              AI-powered startup idea evaluation platform.
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col items-start md:items-center space-y-6 mx-auto">
            <h4 className="text-orange-500 font-semibold text-lg text-center">About Us</h4>
            <div className="flex flex-col space-y-3 text-center md:text-left">
              <a href="mailto:contact@seedrowz.com" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
                Contact
              </a>
              <a href="/#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors font-medium">
                How Seedrowz Works
              </a>
            </div>
          </div>

          {/* Social Column */}
          <div className="flex flex-col items-start md:items-end space-y-6">
            <h4 className="text-orange-500 font-semibold text-lg">Social link</h4>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:opacity-80 transition-opacity">
                <img src="/linkedin.png" alt="Linkedin logo" className="h-8 object-contain" />
              </a>
              <a href="https://github.com/YashSharma64/Seedrowz" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:opacity-80 transition-opacity">
                <img src="/github.png" alt="Github logo" className="h-8 object-contain" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-200/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-orange-900/60">
          <p>© 2026 Seedrowz. Helping founders make decisions worth betting on.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
