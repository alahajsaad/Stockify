 
export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'UNPAID':
      return 'min-w-[70px] bg-rose-500  text-white  ';
    case 'UNRECEIVED':
      return 'min-w-[70px] bg-rose-500 text-white';
    case 'PAID':
      return 'min-w-[70px] bg-green-500 text-white ';
    case 'RECEIVED':
      return 'min-w-[70px] bg-green-500 text-white ';
    default:
      return 'min-w-[70px] bg-gradient-to-r from-gray-400 to-gray-500 text-white  ';
  }
};

export const getStatusText = (status: string) => {
    switch (status) {
      case 'UNPAID':
        return 'Non payé';
      case 'UNRECEIVED':
        return 'Non reçu';
      case 'PAID':
        return 'Payé';
      case 'RECEIVED':
        return 'Reçu';
      default:
        return status;
    }
}
