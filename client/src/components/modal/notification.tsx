/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const NotificationPopup: React.FC<{
  notification: any;
  onAccept: () => void;
  onReject: () => void;
  onCancel: () => void;
}> = ({ notification, onAccept, onReject, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Notification Details</h1>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-gray-900">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.created_at}</p>
          <div className="flex justify-between">
            <button
              onClick={onAccept}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Accept
            </button>
            <button
              onClick={onReject}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
