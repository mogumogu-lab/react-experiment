import { useState, useEffect } from 'react';

/**
 * ProgressDemo - Examples of <progress> component usage
 * Reference: https://react.dev/reference/react-dom/components/progress
 */
export default function ProgressDemo() {
  const [progress, setProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-incrementing progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Simulate file upload
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;progress&gt; Component Examples</h1>

      {/* Basic progress bar */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Basic Progress Bar</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <label htmlFor="basic-progress" style={{ display: 'block', marginBottom: '8px' }}>
            Progress: {progress.toFixed(0)}%
          </label>
          <progress
            id="basic-progress"
            value={progress}
            max={100}
            style={{
              width: '100%',
              height: '24px'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Auto-incrementing progress bar
          </p>
        </div>
      </section>

      {/* Progress bar with different max value */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Progress with Custom Max Value</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <label htmlFor="custom-max-progress" style={{ display: 'block', marginBottom: '8px' }}>
            Progress: {progress.toFixed(0)} / 50
          </label>
          <progress
            id="custom-max-progress"
            value={progress}
            max={50}
            style={{
              width: '100%',
              height: '24px'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Max value set to 50 instead of 100
          </p>
        </div>
      </section>

      {/* Indeterminate progress */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Indeterminate Progress</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e8f5e9'
        }}>
          <label htmlFor="indeterminate-progress" style={{ display: 'block', marginBottom: '8px' }}>
            Loading... (indeterminate)
          </label>
          <progress
            id="indeterminate-progress"
            style={{
              width: '100%',
              height: '24px'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Progress without value attribute shows indeterminate state
          </p>
        </div>
      </section>

      {/* Styled progress bar */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Styled Progress Bar</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <label htmlFor="styled-progress" style={{ display: 'block', marginBottom: '8px' }}>
            Custom Styled Progress: {progress.toFixed(0)}%
          </label>
          <div style={{ position: 'relative', width: '100%', height: '30px' }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#e0e0e0',
              borderRadius: '15px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: progress < 33 ? '#ff5252' :
                                 progress < 66 ? '#ffa726' : '#66bb6a',
                transition: 'width 0.3s ease, background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '8px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px'
              }}>
                {progress > 10 && `${progress.toFixed(0)}%`}
              </div>
            </div>
          </div>
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            ℹ️ Custom styled progress bar with color transitions
          </p>
        </div>
      </section>

      {/* Upload simulation */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. File Upload Progress</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fce4ec'
        }}>
          <button
            onClick={simulateUpload}
            disabled={isUploading}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              marginBottom: '16px',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              opacity: isUploading ? 0.6 : 1
            }}
          >
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </button>

          {isUploading || uploadProgress > 0 ? (
            <>
              <label htmlFor="upload-progress" style={{ display: 'block', marginBottom: '8px' }}>
                Upload Progress: {uploadProgress.toFixed(1)}%
              </label>
              <progress
                id="upload-progress"
                value={uploadProgress}
                max={100}
                style={{
                  width: '100%',
                  height: '28px'
                }}
              />
              {uploadProgress >= 100 && (
                <p style={{ marginTop: '8px', color: '#4caf50', fontWeight: 'bold' }}>
                  ✓ Upload complete!
                </p>
              )}
            </>
          ) : (
            <p style={{ color: '#666' }}>Click the button to simulate file upload</p>
          )}
        </div>
      </section>

      {/* Multiple progress bars */}
      <section style={{ marginBottom: '40px' }}>
        <h2>6. Multiple Progress Bars</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f3e5f5'
        }}>
          {[
            { label: 'HTML', value: 90, color: '#e34c26' },
            { label: 'CSS', value: 75, color: '#264de4' },
            { label: 'JavaScript', value: progress, color: '#f0db4f' },
            { label: 'TypeScript', value: 60, color: '#007acc' },
          ].map((skill, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '4px',
                fontSize: '14px'
              }}>
                <span>{skill.label}</span>
                <span style={{ fontWeight: 'bold' }}>
                  {skill.label === 'JavaScript' ? progress.toFixed(0) : skill.value}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${skill.label === 'JavaScript' ? progress : skill.value}%`,
                  height: '100%',
                  backgroundColor: skill.color,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Circular progress simulation */}
      <section>
        <h2>7. Circular Progress (Custom Implementation)</h2>
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff9c4'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px'
          }}>
            {/* SVG Circular Progress */}
            <div style={{ textAlign: 'center' }}>
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#e0e0e0"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#2196f3"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(progress / 100) * 2 * Math.PI * 50} ${2 * Math.PI * 50}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.3s ease' }}
                />
                <text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  dy="7"
                  fontSize="20"
                  fill="#333"
                  style={{ transform: 'rotate(90deg)', transformOrigin: '60px 60px' }}
                >
                  {progress.toFixed(0)}%
                </text>
              </svg>
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                SVG Circular Progress
              </p>
            </div>

            {/* Native progress (for comparison) */}
            <div style={{ textAlign: 'center' }}>
              <progress
                value={progress}
                max={100}
                style={{
                  width: '120px',
                  height: '120px'
                }}
              />
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                Native Progress
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
