import { useCallback, useEffect, useRef, useState } from "react";

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const parentRef = useRef<HTMLElement>(null);
  
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // This useEffect will trigger if a click occurs outside the element with ref
  // and not inside the element with parentRef
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (
        ref.current && !ref.current.contains(target) && parentRef.current && !parentRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isOpen,setIsOpen, toggle, ref, parentRef };
};

export default useToggle;