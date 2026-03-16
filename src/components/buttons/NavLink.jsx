'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  
  // Check if the current path matches the link's destination
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`relative py-1 text-sm font-medium transition-colors duration-300 hover:text-primary ${
        isActive ? 'text-primary' : 'text-base-content/80'
      }`}
    >
      {children}

      {/* Elegant Underline Animation for Active Link */}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

export default NavLink;