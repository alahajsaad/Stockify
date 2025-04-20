import { AlignJustify } from 'lucide-react';
import { useIsMobile } from 'src/hooks/useMobile';

interface NavBarProps {
    toggleSidebar?: () => void;
}

const NavBar : React.FC<NavBarProps> = ({toggleSidebar}) => {
    const isMobile =useIsMobile() ;
    return (
        <div className="flex items-center justify-between p-4 w-full h-16 border-b bg-white border-gray-200">
            <div className='flex  items-center gap-5'>
                {isMobile &&
                    <AlignJustify onClick={toggleSidebar} className='cursor-pointer h-10 w-10 p-2 rounded-full hover:bg-gray-200' />
                }
                <p>navBar</p>
            </div>
            
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    A
                </div>
                <span className="hidden md:inline text-sm font-medium">Admin</span>
            </div>
        </div>
    );
}
export default NavBar ;