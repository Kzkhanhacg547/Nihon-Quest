const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../app/onboarding/page.tsx');
let code = fs.readFileSync(pagePath, 'utf-8');

// 1. Add import
if (!code.includes('import PlacementTestModal')) {
  code = code.replace(
    'import "./onboarding.css";',
    'import "./onboarding.css";\nimport PlacementTestModal from "@/components/PlacementTestModal";\nimport { type JLPTLevel } from "@/lib/placement-test";'
  );
}

// 2. Add state
if (!code.includes('isTesting')) {
  code = code.replace(
    'const [loading, setLoading] = useState(false);',
    'const [loading, setLoading] = useState(false);\n  const [isTesting, setIsTesting] = useState(false);'
  );
}

// 3. Add handleTestComplete
if (!code.includes('handleTestComplete')) {
  code = code.replace(
    'const handleNext = async () => {',
    `const handleTestComplete = (level: JLPTLevel) => {
    setLevelChoice(level);
    setSelections((s) => ({ ...s, levelChoice: level, learningLevel: level === "BEGINNER" ? "N5" : level }));
    setIsTesting(false);
  };

  const handleNext = async () => {`
  );
}

// 4. Inject button in step 0
if (!code.includes('onClick={() => setIsTesting(true)}')) {
  // We will insert a button underneath the choices if step === 0
  const insertionPoint = `          </div>`; // end of choices div
  
  const blockToFind = `                </button>
              );
            })}
          </div>`;

  const replacementBlock = `                </button>
              );
            })}
          </div>
          {currentStep.id === "level" && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                type="button" 
                className="ob-top-cta" 
                style={{ padding: '0.75rem 1.5rem', background: 'var(--nq-primary)' }}
                onClick={() => setIsTesting(true)}
              >
                Làm bài đánh giá năng lực tự động
              </button>
            </div>
          )}`;
          
  code = code.replace(blockToFind, replacementBlock);
}

// 5. Inject the modal rendering
if (!code.includes('<PlacementTestModal')) {
  code = code.replace(
    '</form>',
    '</form>\n        {isTesting && <PlacementTestModal onClose={() => setIsTesting(false)} onComplete={handleTestComplete} />}'
  );
}

fs.writeFileSync(pagePath, code, 'utf-8');
console.log('Injected placement test UI into onboarding page!');

