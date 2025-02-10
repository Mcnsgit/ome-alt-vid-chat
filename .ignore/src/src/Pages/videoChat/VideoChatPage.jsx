// src/Pages/videoChat/VideoChatPage.jsx
import { useState } from 'react';
import { Drawer, ButtonToolbar, Button, Placeholder } from 'rsuite';
import VideoChat from "../../components/VideoChat/videoChat";
import { useVideoChat } from '../../context/VideoContext';
import "./VideoChatPage.css";
import ChatInterface from '../../components/Chat/ChatInterface';
function VideoChatPage() {
  const [openWithHeader, setOpenWithHeader] = useState(false);
  const { callStatus } = useVideoChat();

  // Debug logging
  console.log('VideoChatPage render:', { callStatus });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 bg-gray-800">
          <ButtonToolbar className="p-2">
            <Button 
              onClick={() => setOpenWithHeader(true)}
              appearance="subtle"
              className="w-full"
            >
              Settings
            </Button>
          </ButtonToolbar>

          <Drawer 
            open={openWithHeader} 
            onClose={() => setOpenWithHeader(false)}
            placement="left"
            size="sm"
          >
            <Drawer.Header>
              <Drawer.Title>Chat Settings</Drawer.Title>
              <Drawer.Actions>
                <Button onClick={() => setOpenWithHeader(false)}>Close</Button>
              </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body>
              <Placeholder.Paragraph rows={20} />
            </Drawer.Body>
          </Drawer>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {callStatus.error ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-red-500 text-white px-6 py-4 rounded-lg">
                {callStatus.error}
              </div>
            </div>
          ) : callStatus.connecting ? (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-blue-400">
                <span className="mr-2">Connecting to video chat...</span>
                <div className="inline-block animate-spin h-4 w-4 border-2 border-blue-400 rounded-full border-t-transparent"></div>
              </div>
            </div>
          ) : (
            <div className="h-screen">
              <VideoChat />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoChatPage;