import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import QrReader from 'react-qr-scanner';
import { parseQRCodeValue, Result } from './utils';

function App() {
  let [result, setResult] = useState<null | Result>(null);

  let handleResult = useCallback((result: any) => {
    let text = result?.text;
    if (text) {
      try {
        let result = parseQRCodeValue(text);
        setResult(result);
      } catch {
        toast.error('Invalid QR Code');
      }
    }
  }, []);

  if (result) {
    return <ResultPage result={result} onClose={() => setResult(null)} />;
  }

  return (
    <div className="h-screen w-screen bg-black">
      <QrReader
        delay={300}
        constraints={{
          video: {
            facingMode: 'environment',
          },
        }}
        style={{ width: '100%', height: '100%' }}
        onScan={handleResult}
        onError={() => {
          toast.error('Error');
        }}
      />
    </div>
  );
}

interface ResultPageProps {
  result: Result;
  onClose?: () => void;
}

function ResultPage({ result, onClose }: ResultPageProps) {
  let [isCopy, setIsCopy] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(result.password).then(() => {
      setIsCopy(true);
    });
  }

  useEffect(() => {
    if (isCopy) {
      let id = setTimeout(() => {
        setIsCopy(false);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopy]);

  return (
    <div className="h-screen w-screen bg-slate-100 grid place-items-center">
      <div className="grid grid-cols-[auto,auto] gap-y-2 gap-x-2 md:gap-x-4 text-lg md:text-4xl">
        <div className="justify-self-end">
          <span className="font-light">NAME</span>
          <span className="text-blue-700 font-bold">:</span>
        </div>
        <div>
          <span className="font-bold">{result.name}</span>
        </div>

        <div className="justify-self-end">
          <span className="font-light">PASSWORD</span>
          <span className="text-blue-700 font-bold">:</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="font-bold">{result.password}</span>{' '}
          <button
            className="bg-slate-200 hover:bg-slate-300 focus:ring-2 focus:outline-none focus:ring-blue-700 font-medium rounded-lg p-1 inline-flex items-center"
            onClick={handleCopy}
          >
            {/* copy svg */}

            {isCopy ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-green-700 w-4 h-4 md:w-8 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-8 md:h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            )}

            <span className="sr-only">Copy</span>
          </button>
        </div>

        <div>
          <button
            type="button"
            className="w-full py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-700"
            onClick={onClose}
          >
            Scan Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
