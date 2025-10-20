'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReportFormData {
  title: string;
  type: string;
  summary: string;
  date: string;
  author: string;
  department: string;
  attachments: File[];
  status: 'draft' | 'published';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  template: string;
  dataPeriod: {
    startDate: string;
    endDate: string;
    frequency: string;
  };
  dataSources: string[];
  metrics: {
    id: string;
    name: string;
    type: string;
    aggregation: string;
    selected: boolean;
  }[];
  visualization: {
    type: string;
    layout: string;
    colorScheme: string;
    showLegend: boolean;
  };
}

const reportTypes = [
  'Ежемесячный отчёт',
  'Ежеквартальный отчёт',
  'Годовой отчёт',
  'Отчёт по безопасности',
  'Финансовый отчёт',
  'Отчёт по обучению',
  'Отчёт по проекту',
  'Аналитический отчёт',
  'Маркетинговый отчёт',
  'Технический отчёт'
];

const departments = [
  'Разработка',
  'Маркетинг',
  'Финансы',
  'HR',
  'Безопасность',
  'Продажи',
  'Поддержка',
  'Управление проектами',
  'Исследования и разработка',
  'Юридический отдел'
];

const reportTemplates = [
  'Стандартный шаблон',
  'Финансовый анализ',
  'Продажи и маркетинг',
  'HR аналитика',
  'Производственные показатели',
  'Клиентская аналитика',
  'Кастомный шаблон'
];

const dataFrequencies = [
  'Ежедневно',
  'Еженедельно',
  'Ежемесячно',
  'Ежеквартально',
  'Ежегодно'
];

const dataSources = [
  'База данных продаж',
  'CRM система',
  'ERP система',
  'Google Analytics',
  'Система учета рабочего времени',
  'Система управления проектами',
  'Финансовая система',
  'Другое'
];

const visualizationTypes = [
  'Линейный график',
  'Столбчатая диаграмма',
  'Круговая диаграмма',
  'Тепловая карта',
  'Точечная диаграмма',
  'Комбинированный график'
];

const colorSchemes = [
  'Стандартная',
  'Корпоративная',
  'Контрастная',
  'Пастельная',
  'Монохромная'
];

const defaultMetrics = [
  { id: 'sales', name: 'Продажи', type: 'number', aggregation: 'sum', selected: false },
  { id: 'revenue', name: 'Выручка', type: 'currency', aggregation: 'sum', selected: false },
  { id: 'customers', name: 'Количество клиентов', type: 'number', aggregation: 'count', selected: false },
  { id: 'conversion', name: 'Конверсия', type: 'percentage', aggregation: 'average', selected: false },
  { id: 'satisfaction', name: 'Удовлетворенность', type: 'rating', aggregation: 'average', selected: false },
  { id: 'efficiency', name: 'Эффективность', type: 'percentage', aggregation: 'average', selected: false }
];

const CreateReportPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    type: reportTypes[0],
    summary: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    department: departments[0],
    attachments: [],
    status: 'draft',
    priority: 'medium',
    tags: [],
    template: reportTemplates[0],
    dataPeriod: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      frequency: dataFrequencies[0]
    },
    dataSources: [],
    metrics: defaultMetrics,
    visualization: {
      type: visualizationTypes[0],
      layout: 'standard',
      colorScheme: colorSchemes[0],
      showLegend: true
    }
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleMetricToggle = (metricId: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map(metric =>
        metric.id === metricId ? { ...metric, selected: !metric.selected } : metric
      )
    }));
  };

  const handleDataSourceToggle = (source: string) => {
    setFormData(prev => ({
      ...prev,
      dataSources: prev.dataSources.includes(source)
        ? prev.dataSources.filter(s => s !== source)
        : [...prev.dataSources, source]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Отправка отчёта:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/lk/reports');
    } catch (err) {
      setError('Произошла ошибка при создании отчёта. Пожалуйста, попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-6 m-4 bg-white bg-opacity-30 backdrop-blur rounded-lg shadow-lg border-2 border-red-500">
      <div className="p-4 bg-white bg-opacity-90 rounded-lg mb-6 text-center border-2 border-red-500">
        <h1 className="text-4xl font-bold text-red-600">Создание нового отчёта</h1>
        <p className="text-gray-700 mt-4 text-xl">Заполните форму для создания нового отчёта</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md border-2 border-red-500">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                Название отчёта *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                placeholder="Введите название отчёта"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-lg font-semibold text-gray-700 mb-2">
                Тип отчёта *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              >
                {reportTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-lg font-semibold text-gray-700 mb-2">
                Дата отчёта *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-lg font-semibold text-gray-700 mb-2">
                Отдел *
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="author" className="block text-lg font-semibold text-gray-700 mb-2">
                Автор отчёта *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                placeholder="Введите имя автора"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-lg font-semibold text-gray-700 mb-2">
                Приоритет *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-lg font-semibold text-gray-700 mb-2">
                Статус *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              >
                <option value="draft">Черновик</option>
                <option value="published">Опубликован</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Теги
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  placeholder="Добавить тег"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                />
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Добавить
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="summary" className="block text-lg font-semibold text-gray-700 mb-2">
            Описание отчёта *
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            placeholder="Введите подробное описание отчёта"
          />
        </div>

        <div className="mt-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Прикреплённые файлы
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          />
          {formData.attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 border-t-2 border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Шаблон и параметры данных</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="template" className="block text-lg font-semibold text-gray-700 mb-2">
                Шаблон отчёта
              </label>
              <select
                id="template"
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
              >
                {reportTemplates.map(template => (
                  <option key={template} value={template}>{template}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Период данных
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Начало</label>
                  <input
                    type="date"
                    value={formData.dataPeriod.startDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dataPeriod: { ...prev.dataPeriod, startDate: e.target.value }
                    }))}
                    className="w-full p-2 rounded-lg border-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Конец</label>
                  <input
                    type="date"
                    value={formData.dataPeriod.endDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      dataPeriod: { ...prev.dataPeriod, endDate: e.target.value }
                    }))}
                    className="w-full p-2 rounded-lg border-2 border-gray-300"
                  />
                </div>
              </div>
              <select
                value={formData.dataPeriod.frequency}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dataPeriod: { ...prev.dataPeriod, frequency: e.target.value }
                }))}
                className="w-full mt-2 p-2 rounded-lg border-2 border-gray-300"
              >
                {dataFrequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Источники данных</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataSources.map(source => (
              <label key={source} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dataSources.includes(source)}
                  onChange={() => handleDataSourceToggle(source)}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span>{source}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t-2 border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Метрики и показатели</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.metrics.map(metric => (
              <label key={metric.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({metric.type})</span>
                </div>
                <input
                  type="checkbox"
                  checked={metric.selected}
                  onChange={() => handleMetricToggle(metric.id)}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t-2 border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Настройка визуализации</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Тип визуализации
              </label>
              <select
                value={formData.visualization.type}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  visualization: { ...prev.visualization, type: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border-2 border-gray-300"
              >
                {visualizationTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Цветовая схема
              </label>
              <select
                value={formData.visualization.colorScheme}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  visualization: { ...prev.visualization, colorScheme: e.target.value }
                }))}
                className="w-full p-3 rounded-lg border-2 border-gray-300"
              >
                {colorSchemes.map(scheme => (
                  <option key={scheme} value={scheme}>{scheme}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.visualization.showLegend}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    visualization: { ...prev.visualization, showLegend: e.target.checked }
                  }))}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span>Показывать легенду</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/lk/reports')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
          >
            {isSubmitting ? 'Создание...' : 'Создать отчёт'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateReportPage; 