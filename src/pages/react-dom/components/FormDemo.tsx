import { useState, FormEvent } from 'react';

/**
 * FormDemo - Examples of <form> component usage
 * Reference: https://react.dev/reference/react-dom/components/form
 */
export default function FormDemo() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form
  const handleControlledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  // Uncontrolled form with FormData
  const handleUncontrolledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };
    alert(`Uncontrolled form submitted:\nUsername: ${data.username}\nPassword: ${data.password}`);
  };

  // Async form submission
  const handleAsyncSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const form = e.currentTarget;
    const formData = new FormData(form);
    alert(`Async submission completed:\nMessage: ${formData.get('message')}`);
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>&lt;form&gt; Component Examples</h1>

      {/* Basic controlled form */}
      <section style={{ marginBottom: '40px' }}>
        <h2>1. Controlled Form</h2>
        <form onSubmit={handleControlledSubmit} style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Submit Controlled Form
          </button>
        </form>

        {submittedData && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px'
          }}>
            <h3>Submitted Data:</h3>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
          </div>
        )}
      </section>

      {/* Uncontrolled form with FormData */}
      <section style={{ marginBottom: '40px' }}>
        <h2>2. Uncontrolled Form (FormData API)</h2>
        <form onSubmit={handleUncontrolledSubmit} style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#fff3e0'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue=""
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue=""
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Submit Uncontrolled Form
          </button>
        </form>
      </section>

      {/* Async form submission */}
      <section style={{ marginBottom: '40px' }}>
        <h2>3. Async Form Submission</h2>
        <form onSubmit={handleAsyncSubmit} style={{
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#e3f2fd'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '8px' }}>
              Message:
            </label>
            <input
              id="message"
              name="message"
              type="text"
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              opacity: isSubmitting ? 0.5 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Async Form'}
          </button>
        </form>
      </section>

      {/* Form with multiple buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2>4. Form with Multiple Submit Buttons</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
            alert(`Form submitted via: ${submitter.value}`);
          }}
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fce4ec'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="data" style={{ display: 'block', marginBottom: '8px' }}>
              Data:
            </label>
            <input
              id="data"
              name="data"
              type="text"
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              name="action"
              value="save"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              Save
            </button>
            <button
              type="submit"
              name="action"
              value="draft"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              Save as Draft
            </button>
            <button
              type="submit"
              name="action"
              value="publish"
              style={{ padding: '10px 20px', fontSize: '14px' }}
            >
              Publish
            </button>
          </div>
        </form>
      </section>

      {/* Form with reset */}
      <section style={{ marginBottom: '40px' }}>
        <h2>5. Form with Reset</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Form submitted!');
          }}
          onReset={() => {
            alert('Form reset!');
          }}
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f3e5f5'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="resetInput" style={{ display: 'block', marginBottom: '8px' }}>
              Input:
            </label>
            <input
              id="resetInput"
              name="resetInput"
              type="text"
              defaultValue="Default value"
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Submit
            </button>
            <button type="reset" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* Form with validation */}
      <section>
        <h2>6. Form with HTML5 Validation</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Valid form submitted!');
          }}
          style={{
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff9c4'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="validEmail" style={{ display: 'block', marginBottom: '8px' }}>
              Email (required):
            </label>
            <input
              id="validEmail"
              name="email"
              type="email"
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="validAge" style={{ display: 'block', marginBottom: '8px' }}>
              Age (18-120):
            </label>
            <input
              id="validAge"
              name="age"
              type="number"
              min="18"
              max="120"
              required
              style={{ width: '100%', padding: '8px', fontSize: '14px' }}
            />
          </div>

          <button type="submit" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Submit with Validation
          </button>
        </form>
      </section>
    </div>
  );
}
