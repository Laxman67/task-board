import { CheckCircle, Circle, ClipboardCheck, Clock } from 'lucide-react';

import React from 'react';

const getStatusIcon = (status) => {
  switch (status) {
    case 'Todo':
      return <ClipboardCheck className="h-5 w-5 text-blue-500 font-bold" />;
    case 'In Progress':
      return <Clock className="h-5 w-5 text-amber-500 font-bold" />;
    case 'Done':
      return <CheckCircle className="h-5 w-5 text-green-500 font-bold" />;
    default:
      return <Circle className="h-5 w-5 text-gray-400 font-bold" />;
  }
};

export default getStatusIcon;
