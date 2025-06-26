'use client';

import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white px-6 py-10 text-sm text-gray-700 mt-8 rounded-xl">
      {/* Top Links Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Culture</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li>Help Centre</li>
            <li>Contact Support</li>
            <li>What's New</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Careers</h4>
          <ul className="space-y-1">
            <li>Open Roles</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <ul className="space-y-1">
            <li>help@probo.in</li>
            <li>communication@probo.in</li>
          </ul>
        </div>
      </div>

      {/* Partnerships */}
      <div className="max-w-7xl mx-auto mb-6">
        <h4 className="font-semibold mb-2">Probo Partnerships</h4>
        <p className="text-gray-600">
          Probo’s experience is made possible by our partnerships with <span className="font-semibold">Authbridge</span> for verification technology, <span className="font-semibold">DataMuni</span> for data & analytics, <span className="font-semibold">Google Firebase</span>, <span className="font-semibold">Google Cloud</span> & <span className="font-semibold">AWS</span>. Probo is also a member of <span className="font-semibold">FICCI</span> and <span className="font-semibold">ASSOCHAM</span>.
        </p>
      </div>

      {/* Logos Row */}
      {/* <div className="max-w-7xl mx-auto flex items-center justify-start space-x-6 mb-10">
        <img src="/logos/tradingview.png" alt="TradingView" className="w-7 h-7" />
        <img src="/logos/amplitude.png" alt="Amplitude" className="w-7 h-7" />
        <img src="/logos/circle.png" alt="Circle" className="w-7 h-7" />
        <img src="/logos/cloud.png" alt="Google Cloud" className="w-7 h-7" />
        <img src="/logos/firebase.png" alt="Firebase" className="w-7 h-7" />
      </div> */}

      {/* Social Media Icons */}
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-8 mb-6">
        <div className="flex items-center space-x-2">
          <Linkedin className="w-5 h-5" />
          <span>LinkedIn</span>
        </div>
        <div className="flex items-center space-x-2">
          <Twitter className="w-5 h-5" />
          <span>Twitter</span>
        </div>
        <div className="flex items-center space-x-2">
          <Instagram className="w-5 h-5" />
          <span>Instagram</span>
        </div>
        <div className="flex items-center space-x-2">
          <Youtube className="w-5 h-5" />
          <span>Youtube</span>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between text-gray-500 text-xs border-t pt-4 border-gray-200">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <a href="#">Terms and Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Legality</a>
        </div>
        <div>© copyright 2025 by Probo Media Technologies Pvt. Ltd.</div>
      </div>
    </footer>
  );
};

export default Footer;
