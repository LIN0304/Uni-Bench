const LINKS = [
  { id: 'benchcouncil-ai-bench', label: 'BenchCouncil AI Bench' },
  { id: 'ai-benchmark', label: 'AI Benchmark' },
  { id: 'geekbench-ai', label: 'Geekbench AI' },
  { id: 'livebench', label: 'LiveBench' },
  { id: 'simplebench', label: 'SimpleBench' },
  { id: 'cs-bench', label: 'CS-Bench' },
  { id: 'eq-bench', label: 'EQ-Bench' },
  { id: 'swe-bench', label: 'SWE-bench' },
  { id: 'deepresearch-bench', label: 'DeepResearch Bench' },
  { id: 'glue-benchmark', label: 'GLUE Benchmark' },
  { id: 'superglue', label: 'SuperGLUE' },
  { id: 'squad', label: 'SQuAD' },
  { id: 'hellaswag', label: 'HellaSwag' },
  { id: 'mmlu', label: 'MMLU' },
  { id: 'big-bench', label: 'BIG-bench' },
  { id: 'ai2-arc', label: 'ARC (AI2 Reasoning Challenge)' },
  { id: 'truthfulqa', label: 'TruthfulQA' },
  { id: 'drop', label: 'DROP' },
  { id: 'gsm8k', label: 'GSM8K' },
  { id: 'bigbench-hard-bbh', label: 'BigBench Hard (BBH)' },
  { id: 'mt-bench-101', label: 'MT-Bench-101' },
  { id: 'agieval', label: 'AGIEval' },
  { id: 'evidently-ai-llm-benchmarks', label: 'Evidently AI LLM Benchmarks' },
  { id: 'humaneval', label: 'HumanEval' },
  { id: 'design-arena-web', label: 'Design Arena (Web)' },
  { id: 'artificial-analysis-rankings', label: 'Artificial Analysis Rankings' },
  { id: 'creative-writing-benchmark', label: 'Creative Writing Benchmark' },
  { id: 'simplebench-rankings', label: 'SimpleBench Rankings' },
  { id: 'confabulations-benchmark', label: 'Confabulations Benchmark' },
  { id: 'eq-bench-rankings', label: 'EQ-Bench Rankings' }
];

(function() {
  const current = location.pathname.split('/').pop().replace('.html', '');
  const nav = document.createElement('nav');
  nav.className = 'tabs';
  LINKS.forEach(link => {
    const a = document.createElement('a');
    a.href = link.id + '.html';
    a.textContent = link.label;
    a.className = 'tab' + (link.id === current ? ' active' : '');
    nav.appendChild(a);
  });
  const main = document.querySelector('main');
  if (main) main.parentNode.insertBefore(nav, main);
})();
