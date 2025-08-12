import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";

const Page = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader title="Профиль" subtitle="Данные мастерской" actions={<Button variant="soft">Редактировать</Button>} />
        <CardContent>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">ФИО, название, лого, контакты, часы работы.</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Тариф" subtitle="План и биллинг" actions={<Button variant="soft">Изменить тариф</Button>} />
        <CardContent>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Текущий план: "Pro". Автопродление: включено.</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Интеграции" subtitle="Календари, SMS, Email" actions={<Button variant="soft">Открыть</Button>} />
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge tone="info">Google Calendar</Badge>
            <Badge tone="info">Yandex Calendar</Badge>
            <Badge>SMS‑шлюз</Badge>
            <Badge>SMTP</Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Реферальная программа" subtitle="Промокоды и начисления" actions={<Button variant="soft">Управлять</Button>} />
        <CardContent>
          <div className="text-sm text-neutral-600 dark:text-neutral-300">Поделитесь ссылкой, получайте % от подписки приглашённых.</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;