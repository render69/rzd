import React from 'react';
import { FaBell, FaEye, FaTrash, FaEyeSlash } from 'react-icons/fa';
import Button from './Button';

interface NotificationCardProps {
  id: number;
  title: string;
  details: string;
  read: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  id,
  title,
  details,
  read,
  isExpanded,
  onToggle,
  onMarkAsRead,
  onDelete
}) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
        read 
          ? 'bg-green-50 border-green-200' 
          : 'bg-white border-[#C8050E]/30 shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <FaBell className={`text-sm ${read ? 'text-green-600' : 'text-[#C8050E]'}`} />
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        {!read && (
          <div className="w-2 h-2 bg-[#C8050E] rounded-full"></div>
        )}
      </div>
      
      {isExpanded && (
        <p className="text-sm text-gray-600 mb-3">{details}</p>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onMarkAsRead}
            className="text-blue-600 hover:text-blue-700"
            title={read ? 'Отметить как непрочитанное' : 'Отметить как прочитанное'}
          >
            <FaEye className="text-xs" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
            title="Удалить уведомление"
          >
            <FaTrash className="text-xs" />
          </Button>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggle}
          className="text-gray-600 hover:text-gray-700"
          title={isExpanded ? 'Свернуть' : 'Развернуть'}
        >
          {isExpanded ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;
