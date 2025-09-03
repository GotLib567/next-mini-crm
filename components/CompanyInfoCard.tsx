import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Building2, PenLine} from "lucide-react";
import Button from "@/components/ui/button";

interface Props {
  title: string;
  address: string;
  description: string;
}

const CompanyInfoCard: React.FC<Props> = ({ title, address, description }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
            <Building2 className="h-20 w-20" />
            <div>
              <div className="md:flex md:items-center md:gap-2">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-sm text-neutral-500">Адрес: {address}</div>
              </div>
              <div className="max-sm:mt-2 text-sm leading-4">{description}</div>
            </div>
          </div>
          <Button className="max-sm:hidden"><PenLine /></Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoCard;