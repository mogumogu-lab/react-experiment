import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * createPortal Demo
 * Renders children into a DOM node that exists outside the hierarchy of the parent component
 */
export default function CreatePortalDemo() {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Create a separate container for portal
    const container = document.createElement('div');
    container.id = 'portal-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    setPortalContainer(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>createPortal API Demo</h2>

      <section style={{ marginBottom: '30px' }}>
        <h3>1. Modal Example</h3>
        <p>Portal을 사용하여 모달을 document.body에 렌더링</p>
        <button onClick={() => setShowModal(true)}>
          Open Modal
        </button>

        {showModal && portalContainer && createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              pointerEvents: 'auto',
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>Modal Content</h4>
              <p>This is rendered using createPortal!</p>
              <p>It's rendered outside the parent component hierarchy.</p>
              <button onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>,
          portalContainer
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>2. Tooltip Example</h3>
        <p>Portal을 사용하여 툴팁을 특정 위치에 렌더링</p>
        <button
          ref={buttonRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{ padding: '10px 20px' }}
        >
          Hover me
        </button>

        {showTooltip && portalContainer && buttonRef.current && createPortal(
          <div
            style={{
              position: 'absolute',
              top: `${buttonRef.current.getBoundingClientRect().bottom + 5}px`,
              left: `${buttonRef.current.getBoundingClientRect().left}px`,
              backgroundColor: '#333',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              pointerEvents: 'auto',
              zIndex: 1000,
            }}
          >
            This is a tooltip rendered via portal!
          </div>,
          portalContainer
        )}
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3>3. Key Benefits</h3>
        <ul>
          <li>DOM 계층 구조 외부에 렌더링</li>
          <li>z-index 문제 해결</li>
          <li>부모의 overflow: hidden 영향 받지 않음</li>
          <li>이벤트는 여전히 React 트리를 따라 버블링</li>
        </ul>
      </section>

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px'
      }}>
        <h4>Usage:</h4>
        <pre style={{ overflow: 'auto' }}>
{`createPortal(
  <Component />,
  targetDOMNode,
  optionalKey
)`}
        </pre>
      </div>
    </div>
  );
}
