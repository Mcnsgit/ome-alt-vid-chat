// src/components/VideoChat/VideoChatLayout.jsx
import PropTypes from 'prop-types';
import { VideoChatContainer } from './VideoChatContainer';

export function VideoChatLayout({ children, sidebar }) {
    return (
      <VideoChatContainer>
        <div className="lg:col-span-2 space-y-4">
          {children}
        </div>
        {sidebar} {/* Just render the sidebar directly */}
      </VideoChatContainer>
    );
}
  
VideoChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.node,  // Make this optional
};