import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

const ROWS = [
  {
    legendKey: 'languages',
    color: '#22c55e',
    speed: 32,
    items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Go', 'Ruby', 'Bash/Shell', 'Perl'],
  },
  {
    legendKey: 'frameworks',
    color: '#3b82f6',
    speed: 26,
    reverse: true,
    items: ['React', 'Node.js', 'Rails', 'GraphQL', 'Next.js', 'Symfony', 'Redux', 'Docker', 'CakePHP', 'Angular'],
  },
  {
    legendKey: 'data',
    color: '#8b5cf6',
    speed: 29,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'DynamoDB', 'Git', 'Jest', 'Cypress', 'CircleCI', 'Lambda', 'S3'],
  },
  {
    legendKey: 'ai',
    color: '#ec4899',
    speed: 22,
    reverse: true,
    items: ['Claude', 'GPT-4o', 'Cursor', 'Copilot', 'LangChain', 'RAG', 'LLM APIs', 'Prompt Eng.', 'MCP', 'Vercel AI', 'Ollama', 'Embeddings', 'OpenAI', 'Hugging Face'],
  },
];

function MarqueeRow({ items, color, speed, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-row">
      <div
        className={`marquee-track${reverse ? ' marquee-reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="marquee-tag"
            style={{ color, borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Visualizer() {
  const { t } = useTranslation();

  return (
    <section id="visualizer">
      <div className="container">
        <SectionHeader label={t('visualizer.label')} title={t('visualizer.title')} />
        <div className="marquee-legend">
          {ROWS.map(({ legendKey, color }) => (
            <span key={legendKey} style={{ color }}>● {t(`visualizer.legend.${legendKey}`)}</span>
          ))}
        </div>
      </div>
      <div className="marquee-wrap">
        {ROWS.map((row, i) => <MarqueeRow key={i} {...row} />)}
      </div>
    </section>
  );
}
