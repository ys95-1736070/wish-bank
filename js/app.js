console.log('🔍 [DEBUG] app.js loading...');

// Check dependencies
console.log('🔍 [DEBUG] Checking dependencies...');
console.log('  - React:', typeof window.React);
console.log('  - ReactDOM:', typeof window.ReactDOM);
console.log('  - AppConstants:', typeof window.AppConstants);

try {
  // Constants (loaded from constants.js via script tag)
  if (!window.AppConstants) {
    throw new Error('AppConstants not loaded! Make sure constants.js loads before app.js');
  }
  const { DEFAULT_IMAGE, APP_CONFIG, ANIMATION_CONFIG } = window.AppConstants;
  console.log('✅ [DEBUG] Constants loaded - DEFAULT_IMAGE:', DEFAULT_IMAGE);

  // Simple icon components (using text/emoji as placeholders)
  // We'll add proper icons later once the app is working
  const Upload = (props) => React.createElement('span', props, '📤');
  const Plus = (props) => React.createElement('span', props, '+');
  const Minus = (props) => React.createElement('span', props, '−');
  const RotateCcw = (props) => React.createElement('span', props, '🔄');
  const Settings = (props) => React.createElement('span', props, '⚙️');
  const TrendingUp = (props) => React.createElement('span', props, '📈');
  
  console.log('✅ [DEBUG] Icon components created');

function SavingsTracker() {
  console.log('🔍 [DEBUG] SavingsTracker component rendering...');
  const [savings, setSavings] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(100);
  const [customImage, setCustomImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [isSetup, setIsSetup] = React.useState(false);
  const [setupTitle, setSetupTitle] = React.useState('');
  const [setupAmount, setSetupAmount] = React.useState('100');
  const [setupImage, setSetupImage] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState(DEFAULT_IMAGE);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showWithdraw, setShowWithdraw] = React.useState(false);
  const [withdrawAmount, setWithdrawAmount] = React.useState('');

  // Load saved data from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSavings(data.savings || 0);
        setDepositAmount(data.depositAmount || 100);
        setCustomImage(data.customImage || '');
        setTitle(data.title || '');
        setIsSetup(data.isSetup || false);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  React.useEffect(() => {
    if (isSetup) {
      const data = { savings, depositAmount, customImage, title, isSetup };
      localStorage.setItem(APP_CONFIG.STORAGE_KEY, JSON.stringify(data));
    }
  }, [savings, depositAmount, customImage, title, isSetup]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > APP_CONFIG.MAX_IMAGE_SIZE) {
      alert(`Image too large! Max size is ${APP_CONFIG.MAX_IMAGE_SIZE / (1024 * 1024)}MB`);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setSetupImage(event.target.result);
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSetupComplete = () => {
    if (!setupTitle.trim()) {
      alert('Please enter a title for your savings goal');
      return;
    }
    const amount = parseFloat(setupAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid deposit amount');
      return;
    }
    
    setTitle(setupTitle.trim());
    setDepositAmount(amount);
    if (setupImage) setCustomImage(setupImage);
    setIsSetup(true);
  };

  const handleDeposit = () => {
    setSavings(prev => prev + depositAmount);
    setIsAnimating(true);
    setShowConfetti(true);
    
    setTimeout(() => setIsAnimating(false), ANIMATION_CONFIG.ANIMATION_DURATION);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (amount > savings) {
      alert('Insufficient funds!');
      return;
    }
    
    setSavings(prev => prev - amount);
    setShowWithdraw(false);
    setWithdrawAmount('');
  };

  const handleUpdateSettings = () => {
    if (!setupTitle.trim()) {
      alert('Please enter a title');
      return;
    }
    const amount = parseFloat(setupAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter valid amount');
      return;
    }
    
    setTitle(setupTitle.trim());
    setDepositAmount(amount);
    if (setupImage) setCustomImage(setupImage);
    setShowSettings(false);
  };

  const handleReset = () => {
    if (confirm('Reset everything? This cannot be undone.')) {
      setSavings(0);
      setTitle('');
      setDepositAmount(100);
      setCustomImage('');
      setIsSetup(false);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
      setShowSettings(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(APP_CONFIG.LOCALE, {
      style: 'currency',
      currency: APP_CONFIG.CURRENCY,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const currentImage = customImage || DEFAULT_IMAGE;

  // Setup screen
  if (!isSetup) {
    return React.createElement('div', {
      className: 'min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4'
    },
      React.createElement('div', {
        className: 'bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full'
      },
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('h1', {
            className: 'text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'
          }, 'Welcome to Savings Tracker'),
          React.createElement('p', {
            className: 'text-gray-600'
          }, 'Set up your savings goal')
        ),
        React.createElement('div', { className: 'space-y-6' },
          // Image upload section
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium text-gray-700 mb-3'
            }, 'Your Piggy Bank Image'),
            React.createElement('div', {
              className: 'flex flex-col items-center gap-4'
            },
              React.createElement('div', {
                className: 'w-40 h-40 rounded-full overflow-hidden shadow-lg ring-4 ring-purple-200'
              },
                React.createElement('img', {
                  src: imagePreview,
                  alt: 'Preview',
                  className: 'w-full h-full object-cover'
                })
              ),
              React.createElement('label', {
                className: 'cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-semibold py-3 px-6 rounded-xl transition-all shadow-md'
              },
                React.createElement(Upload, { className: 'w-4 h-4' }),
                'Upload Your Image',
                React.createElement('input', {
                  type: 'file',
                  accept: 'image/*',
                  onChange: handleImageUpload,
                  className: 'hidden'
                })
              ),
              React.createElement('p', {
                className: 'text-xs text-gray-500 text-center'
              }, `Upload your own or use default (Max ${APP_CONFIG.MAX_IMAGE_SIZE / (1024 * 1024)}MB)`)
            )
          ),
          // Title input
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Savings Goal Title'),
            React.createElement('input', {
              type: 'text',
              value: setupTitle,
              onChange: (e) => setSetupTitle(e.target.value),
              placeholder: 'e.g., Dream Vacation',
              className: 'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none',
              maxLength: APP_CONFIG.MAX_TITLE_LENGTH
            })
          ),
          // Amount input
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Amount Per Tap ($)'),
            React.createElement('input', {
              type: 'number',
              value: setupAmount,
              onChange: (e) => setSetupAmount(e.target.value),
              placeholder: '100',
              min: '0.01',
              step: '0.01',
              className: 'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none'
            })
          ),
          // Start button
          React.createElement('button', {
            onClick: handleSetupComplete,
            className: 'w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg'
          }, 'Start Saving')
        )
      )
    );
  }

  // Main app screen
  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden'
  },
    // Background decorations
    React.createElement('div', {
      className: 'absolute inset-0 overflow-hidden pointer-events-none'
    },
      React.createElement('div', {
        className: 'absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-3xl'
      }),
      React.createElement('div', {
        className: 'absolute bottom-20 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-3xl'
      })
    ),
    // Confetti animation
    showConfetti && React.createElement('div', {
      className: 'absolute inset-0 pointer-events-none'
    },
      [...Array(ANIMATION_CONFIG.CONFETTI_COUNT)].map((_, i) =>
        React.createElement('div', {
          key: i,
          className: 'absolute w-3 h-3 animate-ping',
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ANIMATION_CONFIG.CONFETTI_COLORS[
              Math.floor(Math.random() * ANIMATION_CONFIG.CONFETTI_COLORS.length)
            ]
          }
        })
      )
    ),
    // Main content
    React.createElement('div', {
      className: 'relative z-10 w-full max-w-md'
    },
      // Header
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('div', {
          className: 'inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4'
        },
          React.createElement(TrendingUp, {
            className: 'w-5 h-5 text-purple-600'
          }),
          React.createElement('h1', {
            className: 'text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
          }, title),
          React.createElement('button', {
            onClick: () => {
              setSetupTitle(title);
              setSetupAmount(depositAmount.toString());
              setSetupImage('');
              setImagePreview(currentImage);
              setShowSettings(true);
            },
            className: 'ml-2 p-1 hover:bg-white/50 rounded-full'
          },
            React.createElement(Settings, {
              className: 'w-4 h-4 text-gray-600'
            })
          )
        ),
        React.createElement('p', {
          className: 'text-gray-600 text-sm'
        }, 'Tap to save ', formatCurrency(depositAmount))
      ),
      // Main card
      React.createElement('div', {
        className: 'bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6'
      },
        // Total savings display
        React.createElement('div', { className: 'text-center mb-8' },
          React.createElement('p', {
            className: 'text-sm text-gray-500 mb-2'
          }, 'Total Savings'),
          React.createElement('div', {
            className: `text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-all ${isAnimating ? 'scale-110' : 'scale-100'}`
          }, formatCurrency(savings))
        ),
        // Piggy bank image button
        React.createElement('div', {
          className: 'flex justify-center mb-6'
        },
          React.createElement('button', {
            onClick: handleDeposit,
            className: `relative group transition-all focus:outline-none ${isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'}`
          },
            React.createElement('div', {
              className: 'absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity'
            }),
            React.createElement('div', {
              className: 'relative w-64 h-64 rounded-full overflow-hidden shadow-xl ring-4 ring-white/50 group-hover:ring-purple-300 transition-all'
            },
              React.createElement('img', {
                src: currentImage,
                alt: 'Savings',
                className: 'w-full h-full object-cover'
              }),
              React.createElement('div', {
                className: 'absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'
              },
                React.createElement('div', {
                  className: 'bg-white/90 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform'
                },
                  React.createElement(Plus, {
                    className: 'w-8 h-8 text-purple-600'
                  })
                )
              )
            ),
            isAnimating && React.createElement('div', {
              className: 'absolute inset-0 flex items-center justify-center pointer-events-none'
            },
              React.createElement('div', {
                className: 'text-3xl font-bold text-green-500 animate-ping'
              }, '+', formatCurrency(depositAmount))
            )
          )
        ),
        // Stats grid
        React.createElement('div', {
          className: 'grid grid-cols-2 gap-4 mb-6'
        },
          React.createElement('div', {
            className: 'bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center'
          },
            React.createElement('p', {
              className: 'text-xs text-gray-500 mb-1'
            }, 'Deposits Made'),
            React.createElement('p', {
              className: 'text-2xl font-bold text-purple-600'
            }, Math.floor(savings / depositAmount))
          ),
          React.createElement('div', {
            className: 'bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center'
          },
            React.createElement('p', {
              className: 'text-xs text-gray-500 mb-1'
            }, 'Per Deposit'),
            React.createElement('p', {
              className: 'text-2xl font-bold text-blue-600'
            }, formatCurrency(depositAmount))
          )
        ),
        // Action buttons
        React.createElement('div', { className: 'space-y-3' },
          React.createElement('button', {
            onClick: () => setShowWithdraw(true),
            className: 'w-full bg-gradient-to-r from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 text-red-700 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md'
          },
            React.createElement(Minus, { className: 'w-4 h-4' }),
            'Withdraw Money'
          ),
          React.createElement('button', {
            onClick: handleReset,
            className: 'w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md'
          },
            React.createElement(RotateCcw, { className: 'w-4 h-4' }),
            'Reset Everything'
          )
        )
      ),
      // Auto-saved indicator
      React.createElement('div', {
        className: 'text-center text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-md'
      }, '💡 Auto-saved')
    ),
    // Settings modal
    showSettings && React.createElement('div', {
      className: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
    },
      React.createElement('div', {
        className: 'bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto'
      },
        React.createElement('h2', {
          className: 'text-2xl font-bold mb-6'
        }, 'Settings'),
        React.createElement('div', { className: 'space-y-4 mb-6' },
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium mb-3'
            }, 'Change Image'),
            React.createElement('div', {
              className: 'flex flex-col items-center gap-3'
            },
              React.createElement('div', {
                className: 'w-32 h-32 rounded-full overflow-hidden shadow-lg ring-4 ring-purple-200'
              },
                React.createElement('img', {
                  src: imagePreview,
                  alt: 'Current',
                  className: 'w-full h-full object-cover'
                })
              ),
              React.createElement('label', {
                className: 'cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-700 font-medium py-2 px-4 rounded-lg text-sm'
              },
                React.createElement(Upload, { className: 'w-4 h-4' }),
                'Change Image',
                React.createElement('input', {
                  type: 'file',
                  accept: 'image/*',
                  onChange: handleImageUpload,
                  className: 'hidden'
                })
              )
            )
          ),
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium mb-2'
            }, 'Title'),
            React.createElement('input', {
              type: 'text',
              value: setupTitle,
              onChange: (e) => setSetupTitle(e.target.value),
              className: 'w-full px-4 py-3 rounded-xl border-2 focus:border-purple-400 focus:outline-none',
              maxLength: APP_CONFIG.MAX_TITLE_LENGTH
            })
          ),
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium mb-2'
            }, 'Amount Per Tap'),
            React.createElement('input', {
              type: 'number',
              value: setupAmount,
              onChange: (e) => setSetupAmount(e.target.value),
              min: '0.01',
              step: '0.01',
              className: 'w-full px-4 py-3 rounded-xl border-2 focus:border-purple-400 focus:outline-none'
            })
          )
        ),
        React.createElement('div', { className: 'flex gap-3' },
          React.createElement('button', {
            onClick: () => {
              setShowSettings(false);
              setSetupImage('');
              setImagePreview(currentImage);
            },
            className: 'flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3 px-6 rounded-xl'
          }, 'Cancel'),
          React.createElement('button', {
            onClick: handleUpdateSettings,
            className: 'flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl'
          }, 'Save')
        )
      )
    ),
    // Withdraw modal
    showWithdraw && React.createElement('div', {
      className: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
    },
      React.createElement('div', {
        className: 'bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full'
      },
        React.createElement('h2', {
          className: 'text-2xl font-bold mb-2'
        }, 'Withdraw Money'),
        React.createElement('p', {
          className: 'text-gray-600 mb-6'
        }, 'Available: ', formatCurrency(savings)),
        React.createElement('div', { className: 'mb-6' },
          React.createElement('label', {
            className: 'block text-sm font-medium mb-2'
          }, 'Amount to Withdraw ($)'),
          React.createElement('input', {
            type: 'number',
            value: withdrawAmount,
            onChange: (e) => setWithdrawAmount(e.target.value),
            placeholder: '0.00',
            min: '0.01',
            step: '0.01',
            className: 'w-full px-4 py-3 rounded-xl border-2 focus:border-red-400 focus:outline-none'
          })
        ),
        React.createElement('div', { className: 'flex gap-3' },
          React.createElement('button', {
            onClick: () => {
              setShowWithdraw(false);
              setWithdrawAmount('');
            },
            className: 'flex-1 bg-gray-200 hover:bg-gray-300 font-semibold py-3 px-6 rounded-xl'
          }, 'Cancel'),
          React.createElement('button', {
            onClick: handleWithdraw,
            className: 'flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl'
          }, 'Withdraw')
        )
      )
    )
  );
}

// Initialize the app
console.log('🔍 [DEBUG] Initializing React app...');
try {
  const rootElement = document.getElementById('root');
  console.log('🔍 [DEBUG] Root element:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found! Make sure <div id="root"></div> exists in HTML');
  }
  
  if (!window.ReactDOM || !window.ReactDOM.createRoot) {
    throw new Error('ReactDOM.createRoot not available! Make sure React 18+ is loaded');
  }
  
  console.log('🔍 [DEBUG] Creating React root...');
  const root = ReactDOM.createRoot(rootElement);
  
  console.log('🔍 [DEBUG] Rendering SavingsTracker component...');
  root.render(React.createElement(SavingsTracker));
  
  console.log('✅ [DEBUG] App initialized successfully!');
} catch (error) {
  console.error('❌ [FATAL ERROR] Failed to initialize app:', error);
  console.error('Error stack:', error.stack);
  
  // Show error to user
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: monospace;">
        <h1 style="color: red;">❌ Error Loading App</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Check the browser console (F12) for details.</strong></p>
        <hr>
        <h3>Troubleshooting:</h3>
        <ol>
          <li>Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)</li>
          <li>Check that all CDN scripts loaded</li>
          <li>Check browser console for script loading errors</li>
          <li>See TROUBLESHOOTING.md for more help</li>
        </ol>
      </div>
    `;
  }
}

} catch (error) {
  console.error('❌ [FATAL ERROR] Failed to load app.js:', error);
  console.error('Error stack:', error.stack);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; font-family: monospace; color: red;">
      <h1>❌ Critical Error</h1>
      <p>${error.message}</p>
      <p>Check console for details (F12)</p>
    </div>
  `;
}

