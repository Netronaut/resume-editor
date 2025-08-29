import { useCallback, useRef, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// Register only JSON language to keep bundle small
SyntaxHighlighter.registerLanguage('json', json)

interface EnhancedJsonEditorProps {
  value: string
  onChange: (value: string) => void
  onInput: (e: React.FormEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  className?: string
}

export function EnhancedJsonEditor({
  value,
  onChange,
  onInput,
  placeholder,
  className = '',
}: EnhancedJsonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const handleScroll = useCallback((e: React.UIEvent<HTMLTextAreaElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      onInput(e)
    },
    [onInput]
  )

  // Generate line numbers
  const lineCount = value.split('\n').length
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)

  return (
    <div className={`relative flex rounded-md border bg-white ${className}`}>
      {/* Line Numbers */}
      <div className="flex flex-col overflow-hidden rounded-l-md border-r bg-neutral-50 px-2 py-2 text-right font-mono text-xs text-neutral-400 select-none">
        <div
          style={{
            transform: `translateY(-${scrollTop}px)`,
          }}
        >
          {lineNumbers.map(num => (
            <div key={num} className="min-h-6 leading-6">
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Editor Container */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax Highlighting Background */}
        <div className="pointer-events-none absolute inset-0">
          <div
            style={{
              transform: `translateY(-${scrollTop}px)`,
            }}
          >
            <SyntaxHighlighter
              language="json"
              style={github}
              customStyle={{
                margin: 0,
                padding: '8px 12px',
                background: 'transparent',
                fontSize: '14px',
                fontFamily:
                  'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                lineHeight: '24px',
              }}
              showLineNumbers={false}
            >
              {value || ' '}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Invisible Textarea Overlay */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onInput={handleInput}
          onScroll={handleScroll}
          placeholder={placeholder}
          className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent font-mono text-sm leading-6 text-transparent caret-black outline-none selection:bg-blue-200"
          style={{
            fontSize: '14px',
            lineHeight: '24px',
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            padding: '8px 24px 8px 12px', // Extra right padding for scrollbar
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  )
}
