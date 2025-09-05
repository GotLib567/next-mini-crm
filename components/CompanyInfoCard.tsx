import React, {useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Building2, ChevronDown, ChevronUp, PenLine} from "lucide-react";
import Button from "@/components/ui/button";

interface Props {
  title: string;
  address: string;
  description: string;
}

const CompanyInfoCard: React.FC<Props> = ({ title, address, description }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
            <Building2 className="h-20 w-20" />
            <div className="flex flex-col gap-1">
              <div className="md:flex md:items-center md:gap-2">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-sm text-neutral-500">Адрес: {address}</div>
              </div>

              <div className="max-sm:mt-2 text-sm leading-4">{description}</div>

              {showMore ? (
                <div>
                  <div className="mt-2 text-sm">Номер телефона: +79121111111</div>
                  <div className="mt-2 text-sm">Время работы: 10:00 - 20:00</div>
                  <div className="mt-2 text-sm">Дополнительная информация: show more info</div>
                  <Button variant="soft" className="mt-2 md:w-1/2" onClick={() => setShowMore(v => !v)}>
                    Скрыть <ChevronUp className="h-4 w-4"/>
                  </Button>
                </div>
                ) : (
                <Button variant="soft" className="mt-2 md:w-1/2" onClick={() => setShowMore(v => !v)}>
                  Показать больше <ChevronDown className="h-4 w-4"/>
                </Button>
              )}
            </div>
          </div>
          <Button className="max-sm:hidden"><PenLine /></Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoCard;