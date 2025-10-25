import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Quiz from '@/components/Quiz';

interface HistoricalEvent {
  id: number;
  name: string;
  year: string;
  description: string;
  x: number;
  y: number;
  category: 'military' | 'culture' | 'science' | 'politics';
  points: number;
  icon: string;
}

const historicalEvents: HistoricalEvent[] = [
  {
    id: 1,
    name: 'Куликовская битва',
    year: '1380',
    description: 'Решающее сражение между русским войском под командованием Дмитрия Донского и войсками Золотой Орды.',
    x: 45,
    y: 35,
    category: 'military',
    points: 100,
    icon: '⚔️'
  },
  {
    id: 2,
    name: 'Основание Санкт-Петербурга',
    year: '1703',
    description: 'Пётр I основал новую столицу России, ставшую "окном в Европу".',
    x: 38,
    y: 22,
    category: 'politics',
    points: 150,
    icon: '🏛️'
  },
  {
    id: 3,
    name: 'Полёт Гагарина',
    year: '1961',
    description: 'Юрий Гагарин совершил первый в истории полёт человека в космос.',
    x: 55,
    y: 28,
    category: 'science',
    points: 200,
    icon: '🚀'
  },
  {
    id: 4,
    name: 'Бородинское сражение',
    year: '1812',
    description: 'Крупнейшее сражение Отечественной войны 1812 года между русской и французской армиями.',
    x: 50,
    y: 32,
    category: 'military',
    points: 150,
    icon: '🎖️'
  },
  {
    id: 5,
    name: 'Открытие МГУ',
    year: '1755',
    description: 'Михаил Ломоносов основал первый российский университет.',
    x: 52,
    y: 30,
    category: 'science',
    points: 120,
    icon: '📚'
  },
  {
    id: 6,
    name: 'Невская битва',
    year: '1240',
    description: 'Александр Невский разгромил шведское войско на реке Неве.',
    x: 40,
    y: 24,
    category: 'military',
    points: 100,
    icon: '🛡️'
  }
];

const categories = [
  { key: 'military', name: 'Военные', color: 'bg-red-500', icon: 'Sword' },
  { key: 'culture', name: 'Культура', color: 'bg-purple-500', icon: 'Palette' },
  { key: 'science', name: 'Наука', color: 'bg-blue-500', icon: 'Microscope' },
  { key: 'politics', name: 'Политика', color: 'bg-green-500', icon: 'Building2' }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'history' | 'games'>('map');
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [discoveredEvents, setDiscoveredEvents] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleEventClick = (event: HistoricalEvent) => {
    setSelectedEvent(event);
    if (!discoveredEvents.includes(event.id)) {
      setDiscoveredEvents([...discoveredEvents, event.id]);
      setScore(score + event.points);
    }
  };

  const handleQuizComplete = (finalScore: number) => {
    setQuizScore(finalScore);
    setScore(score + finalScore);
    setQuizCompleted(true);
    setIsQuizActive(false);
  };

  const startQuiz = () => {
    setIsQuizActive(true);
    setQuizCompleted(false);
    setQuizScore(0);
  };

  const progress = (discoveredEvents.length / historicalEvents.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-game-purple to-game-pink bg-clip-text text-transparent mb-2">
                Патриот России 🇷🇺
              </h1>
              <p className="text-lg text-muted-foreground">
                Изучай историю через интерактивные игры
              </p>
            </div>
            <Card className="p-4 hover-scale">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{score}</div>
                <div className="text-sm text-muted-foreground">Баллов</div>
                <Progress value={progress} className="mt-2 h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {discoveredEvents.length} / {historicalEvents.length} событий
                </div>
              </div>
            </Card>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant={activeTab === 'map' ? 'default' : 'outline'}
              onClick={() => setActiveTab('map')}
              className="hover-scale"
              size="lg"
            >
              <Icon name="Map" className="mr-2" size={20} />
              Карта
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'outline'}
              onClick={() => setActiveTab('history')}
              className="hover-scale"
              size="lg"
            >
              <Icon name="BookOpen" className="mr-2" size={20} />
              История
            </Button>
            <Button
              variant={activeTab === 'games' ? 'default' : 'outline'}
              onClick={() => setActiveTab('games')}
              className="hover-scale"
              size="lg"
            >
              <Icon name="Gamepad2" className="mr-2" size={20} />
              Игры
            </Button>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {categories.map((cat) => (
              <Badge
                key={cat.key}
                variant="secondary"
                className={`${cat.color} text-white hover-scale cursor-pointer`}
              >
                <Icon name={cat.icon as any} className="mr-1" size={14} />
                {cat.name}
              </Badge>
            ))}
          </div>
        </header>

        {activeTab === 'map' && (
          <div className="animate-scale-in">
            <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-primary/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="MapPin" className="text-primary" />
                Интерактивная карта России
              </h2>
              <p className="text-muted-foreground mb-6">
                Нажимай на метки, чтобы узнать об исторических событиях и получить баллы!
              </p>

              <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>

                {historicalEvents.map((event) => {
                  const isDiscovered = discoveredEvents.includes(event.id);
                  const categoryData = categories.find((c) => c.key === event.category);

                  return (
                    <button
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`absolute group transition-all duration-300 ${
                        isDiscovered ? 'scale-110' : 'scale-100 hover:scale-125'
                      }`}
                      style={{
                        left: `${event.x}%`,
                        top: `${event.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div
                        className={`relative ${
                          isDiscovered ? '' : 'pulse-glow'
                        }`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full ${
                            categoryData?.color
                          } flex items-center justify-center text-3xl shadow-lg border-4 border-white ${
                            isDiscovered ? 'opacity-60' : 'opacity-100'
                          } transition-all`}
                        >
                          {event.icon}
                        </div>
                        {isDiscovered && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <Icon name="Check" size={14} className="text-white" />
                          </div>
                        )}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-semibold">
                          {event.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 hover-scale">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Trophy" className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{discoveredEvents.length}</div>
                    <div className="text-sm text-muted-foreground">Открыто</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon name="Star" className="text-secondary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{score}</div>
                    <div className="text-sm text-muted-foreground">Баллов</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-scale">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Target" className="text-accent" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round(progress)}%</div>
                    <div className="text-sm text-muted-foreground">Прогресс</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historicalEvents.map((event) => {
                const isDiscovered = discoveredEvents.includes(event.id);
                const categoryData = categories.find((c) => c.key === event.category);

                return (
                  <Card
                    key={event.id}
                    className={`p-6 hover-scale cursor-pointer transition-all ${
                      isDiscovered ? 'border-primary border-2' : 'opacity-50 blur-sm'
                    }`}
                    onClick={() => isDiscovered && handleEventClick(event)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl ${categoryData?.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{isDiscovered ? event.name : '???'}</h3>
                          {isDiscovered && (
                            <Badge variant="secondary" className="text-xs">
                              +{event.points}
                            </Badge>
                          )}
                        </div>
                        <Badge className={`${categoryData?.color} text-white mb-2`}>
                          {categoryData?.name}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-2">
                          {isDiscovered ? event.year : '????'}
                        </p>
                        {isDiscovered && (
                          <p className="text-sm">{event.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="animate-scale-in">
            {isQuizActive ? (
              <Quiz onComplete={handleQuizComplete} />
            ) : quizCompleted ? (
              <Card className="p-8 max-w-2xl mx-auto text-center mb-6">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl shadow-2xl">
                    🏆
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Викторина пройдена!</h2>
                  <p className="text-muted-foreground mb-6">Отличная работа! Вы заработали баллы!</p>
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl border-2 border-primary/20 mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">+{quizScore}</div>
                    <div className="text-lg text-muted-foreground">Баллов заработано</div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={startQuiz} size="lg" className="hover-scale">
                      <Icon name="RotateCcw" className="mr-2" size={20} />
                      Пройти ещё раз
                    </Button>
                    <Button onClick={() => setActiveTab('map')} variant="outline" size="lg" className="hover-scale">
                      <Icon name="Map" className="mr-2" size={20} />
                      К карте
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card onClick={startQuiz} className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-primary/30">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                      🎯
                    </div>
                    <h3 className="text-xl font-bold mb-2">Викторина</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Проверь свои знания истории в увлекательной викторине
                    </p>
                    <Badge className="bg-primary text-white">Играть сейчас!</Badge>
                  </div>
                </Card>

              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-blue-100 to-cyan-100">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                    🧩
                  </div>
                  <h3 className="text-xl font-bold mb-2">Пазлы</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Собери исторические картины из фрагментов
                  </p>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
              </Card>

              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-orange-100 to-red-100">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                    ⏱️
                  </div>
                  <h3 className="text-xl font-bold mb-2">Хронология</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Расставь события в правильном порядке
                  </p>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
              </Card>

              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-green-100 to-emerald-100">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                    🎲
                  </div>
                  <h3 className="text-xl font-bold mb-2">Своя игра</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Отвечай на вопросы и зарабатывай баллы
                  </p>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
              </Card>

              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-yellow-100 to-amber-100">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                    🗺️
                  </div>
                  <h3 className="text-xl font-bold mb-2">Географ</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Найди города и регионы на карте России
                  </p>
                  <Badge variant="secondary">Скоро</Badge>
                </div>
              </Card>

                <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-indigo-100 to-violet-100">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg">
                      👥
                    </div>
                    <h3 className="text-xl font-bold mb-2">Личности</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Угадай исторических деятелей по описанию
                    </p>
                    <Badge variant="secondary">Скоро</Badge>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>

      <Dialog open={selectedEvent !== null} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">{selectedEvent.icon}</span>
                  {selectedEvent.name}
                </DialogTitle>
                <DialogDescription>
                  <Badge className={`${categories.find((c) => c.key === selectedEvent.category)?.color} text-white mt-2`}>
                    {categories.find((c) => c.key === selectedEvent.category)?.name}
                  </Badge>
                  <span className="ml-2 text-lg font-semibold">{selectedEvent.year}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-base leading-relaxed mb-6">{selectedEvent.description}</p>
                
                {!discoveredEvents.includes(selectedEvent.id) && (
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border-2 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Icon name="Plus" className="text-white" size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-lg">+{selectedEvent.points} баллов</div>
                          <div className="text-sm text-muted-foreground">Событие открыто!</div>
                        </div>
                      </div>
                      <Icon name="Trophy" className="text-primary" size={40} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;