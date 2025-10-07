import { useState } from 'react'

// Simulated tainted values tracking
const taintedValues = new Map<any, string>()

// Simulated taintUniqueValue
function simulateTaintUniqueValue(value: any, message: string) {
  taintedValues.set(value, message)
  console.warn(`[TAINT] Value marked as tainted: ${message}`)
}

// Check if value is tainted
function checkTaintedValue(value: any): string | null {
  return taintedValues.get(value) || null
}

// Example: API keys and tokens
interface APIConfig {
  publicKey: string
  privateKey: string // Should never be sent to client!
  endpoint: string
}

// Server-side configuration
function getAPIConfig(): APIConfig {
  const config: APIConfig = {
    publicKey: 'pk_live_abc123xyz',
    privateKey: 'sk_live_secret_456def',
    endpoint: 'https://api.example.com'
  }

  // Mark the private key value as tainted
  simulateTaintUniqueValue(
    config.privateKey,
    'Private API key must never be sent to the client'
  )

  return config
}

// Example: Database credentials
interface DBConfig {
  host: string
  port: number
  username: string
  password: string // Should never be sent to client!
}

function getDBConfig(): DBConfig {
  const config: DBConfig = {
    host: 'db.example.com',
    port: 5432,
    username: 'admin',
    password: 'super_secret_password_789'
  }

  // Mark password as tainted
  simulateTaintUniqueValue(
    config.password,
    'Database password must never be exposed'
  )

  return config
}

export default function ExperimentalTaintUniqueValueDemo() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const attemptSendAPIConfig = () => {
    setError(null)

    try {
      const config = getAPIConfig()

      // Check each value before sending
      Object.entries(config).forEach(([key, value]) => {
        const taintMessage = checkTaintedValue(value)
        if (taintMessage) {
          throw new Error(`🚨 SECURITY VIOLATION: Attempted to send tainted value "${key}": ${taintMessage}`)
        }
      })

      setResult(config)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const attemptSendDBConfig = () => {
    setError(null)

    try {
      const config = getDBConfig()

      // Check each value before sending
      Object.entries(config).forEach(([key, value]) => {
        const taintMessage = checkTaintedValue(value)
        if (taintMessage) {
          throw new Error(`🚨 SECURITY VIOLATION: Attempted to send tainted value "${key}": ${taintMessage}`)
        }
      })

      setResult(config)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const attemptSendSafeConfig = () => {
    setError(null)

    try {
      const config = getAPIConfig()

      // Create safe version without private key
      const safeConfig = {
        publicKey: config.publicKey,
        endpoint: config.endpoint
      }

      // Check values
      Object.entries(safeConfig).forEach(([key, value]) => {
        const taintMessage = checkTaintedValue(value)
        if (taintMessage) {
          throw new Error(`🚨 SECURITY VIOLATION: Attempted to send tainted value "${key}": ${taintMessage}`)
        }
      })

      setResult(safeConfig)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">experimental_taintUniqueValue()</h1>
        <p className="text-gray-400 mb-6">
          experimental_taintUniqueValue()는 특정 값(문자열, 숫자 등)을 "오염된(tainted)" 것으로 표시하여
          클라이언트로 전송되는 것을 방지합니다. API 키, 비밀번호 같은 민감한 값을 보호합니다.
        </p>
      </div>

      <div className="space-y-6">
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Interactive Demo</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={attemptSendAPIConfig}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Send API Config (Unsafe)
              </button>
              <button
                onClick={attemptSendDBConfig}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
              >
                Send DB Config (Unsafe)
              </button>
              <button
                onClick={attemptSendSafeConfig}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
              >
                Send Safe Config (Filtered)
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-500 p-4 rounded">
                <p className="font-semibold text-red-400 mb-1">Error:</p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {result && !error && (
              <div className="bg-green-900/30 border border-green-500 p-4 rounded">
                <p className="font-semibold text-green-400 mb-2">✓ Safe Data Sent:</p>
                <pre className="text-xs font-mono text-gray-300">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-900/30 p-3 rounded border border-yellow-700">
              <p className="text-sm text-yellow-200">
                <strong>실험:</strong> 처음 두 버튼은 오염된 값(privateKey, password)을 포함하여
                전송하려 시도하므로 에러가 발생합니다. "Send Safe Config"는 오염된 값을 제외하여 성공합니다.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Code Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`import { experimental_taintUniqueValue } from 'react';

// Server Component only!
function getSecrets() {
  const apiKey = process.env.API_KEY;
  const dbPassword = process.env.DB_PASSWORD;

  // Mark these specific values as tainted
  experimental_taintUniqueValue(
    apiKey,
    'API key',
    'API keys must not be sent to the client'
  );

  experimental_taintUniqueValue(
    dbPassword,
    'Database password',
    'Database credentials must not be exposed'
  );

  return { apiKey, dbPassword };
}

// ❌ This will throw an error
export async function ServerComponent() {
  const secrets = getSecrets();

  // Error! Trying to pass tainted value to client
  return <ClientComponent apiKey={secrets.apiKey} />;
}

// ✓ This is safe
export async function ServerComponent() {
  const secrets = getSecrets();

  // Use the secret on server only
  const data = await fetch(API_URL, {
    headers: { Authorization: secrets.apiKey }
  });

  // Only send the fetched data
  return <ClientComponent data={data} />;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">How It Works</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">1. Mark Specific Value</p>
              <p className="text-gray-400">
                특정 문자열, 숫자 등의 값을 오염된 것으로 표시
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="font-semibold">2. Track by Value</p>
              <p className="text-gray-400">
                값 자체를 추적하여 어디에 있든 감지
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">3. Runtime Protection</p>
              <p className="text-gray-400">
                오염된 값이 클라이언트로 가려하면 즉시 에러
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">4. Development Safety</p>
              <p className="text-gray-400">
                개발 중 실수로 비밀 값 노출 방지
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Use Cases</h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ API Keys and Secrets</p>
              <p className="text-gray-400">process.env에서 가져온 API 키와 시크릿</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Database Credentials</p>
              <p className="text-gray-400">DB 연결 문자열, 비밀번호</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Authentication Tokens</p>
              <p className="text-gray-400">서버 전용 JWT 토큰, 세션 키</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ Private Keys</p>
              <p className="text-gray-400">암호화 키, 서명 키 등</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">✓ SSN, Credit Cards</p>
              <p className="text-gray-400">개인 식별 정보, 금융 정보</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">taintObjectReference vs taintUniqueValue</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-blue-400 mb-2">taintObjectReference</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 객체 참조를 추적</li>
                <li>• 전체 객체가 보호됨</li>
                <li>• 새 객체는 안전함</li>
                <li>• 구조적 민감 데이터</li>
              </ul>
              <pre className="text-xs text-gray-500 mt-2"><code>{`const user = getUser();
taintObjectReference(user);
// user object itself tainted
const copy = {...user};
// copy is safe`}</code></pre>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="font-semibold text-green-400 mb-2">taintUniqueValue</p>
              <ul className="space-y-1 text-gray-300">
                <li>• 특정 값을 추적</li>
                <li>• 어디에 있든 해당 값 보호</li>
                <li>• 복사해도 여전히 오염</li>
                <li>• 개별 민감 값</li>
              </ul>
              <pre className="text-xs text-gray-500 mt-2"><code>{`const key = process.env.KEY;
taintUniqueValue(key);
// the value itself tainted
const obj = { apiKey: key };
// still tainted!`}</code></pre>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Real-World Example</h2>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-green-400">{`// server-config.ts
import { experimental_taintUniqueValue } from 'react';

export function getServerConfig() {
  const config = {
    publicApiUrl: process.env.NEXT_PUBLIC_API_URL,
    privateApiKey: process.env.API_SECRET_KEY,
    dbUrl: process.env.DATABASE_URL
  };

  // Taint sensitive values
  experimental_taintUniqueValue(
    config.privateApiKey,
    'Private API key'
  );

  experimental_taintUniqueValue(
    config.dbUrl,
    'Database URL'
  );

  return config;
}

// page.tsx (Server Component)
export default async function Page() {
  const config = getServerConfig();

  // ✓ Use secrets server-side
  const data = await fetch(config.publicApiUrl, {
    headers: { 'X-API-Key': config.privateApiKey }
  });

  // ✓ Only send public data to client
  return <ClientComponent data={await data.json()} />;
}
`}</code>
          </pre>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Important Notes</h2>
          <div className="space-y-2 text-gray-300">
            <p>• <strong>Value tracking:</strong> 값 자체를 추적, 어디에 복사해도 오염됨</p>
            <p>• <strong>Unique values only:</strong> 고유한 값(시크릿, 토큰 등)에 적합</p>
            <p>• <strong>Server Components only:</strong> 서버 측에서만 사용 가능</p>
            <p>• <strong>Not encryption:</strong> 암호화가 아닌 전송 차단 메커니즘</p>
            <p>• <strong>Development tool:</strong> 개발 시 보안 실수 조기 발견</p>
          </div>
        </section>
      </div>

      <div className="bg-yellow-900/30 p-4 rounded border border-yellow-700">
        <h3 className="font-semibold mb-2 text-yellow-400">⚠️ Experimental API</h3>
        <p className="text-sm text-gray-300">
          experimental_taintUniqueValue()는 실험적 API로 Server Components와
          React Server Actions에서만 사용 가능합니다. 이 데모는 개념 설명을 위한 시뮬레이션입니다.
        </p>
      </div>

      <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
        <h3 className="font-semibold mb-2">💡 Key Points:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
          <li>특정 값(문자열, 숫자 등)을 오염된 것으로 표시</li>
          <li>값이 어디에 있든 추적하여 보호</li>
          <li>클라이언트 전송 시 런타임 에러 발생</li>
          <li>API 키, 비밀번호, 토큰 보호에 이상적</li>
          <li>서버 컴포넌트 전용 API</li>
          <li>개발 중 보안 실수 방지</li>
        </ul>
      </div>
    </div>
  )
}