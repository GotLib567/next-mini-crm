import React from 'react';
import Button from "@/components/ui/button";
import {Building2, ChevronDown, MapPin, Plus} from "lucide-react";
import {companies} from "@/constants";

interface Props {
  currentCompany: Object,
  companyMenu: boolean,
  companyId: string,
  onSelectCompany: (id: number) => void,
  setCompanyMenu: (v: boolean) => void,
}

const CompanyPicker: React.FC<Props> = ({ currentCompany, companyId, companyMenu, onSelectCompany, setCompanyMenu }) => {
  return (
    <div className="relative">
      <Button variant="soft" onClick={() => setCompanyMenu(v=>!v)}>
        <Building2 className="h-4 w-4"/> {currentCompany.title} <ChevronDown className="h-4 w-4"/>
      </Button>
      {companyMenu && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg p-2 z-50">
          <Button variant="primary" className="w-full mb-2"><Plus className="h-4 w-4"/> Создать компанию</Button>
          <div className="max-h-80 overflow-auto">
            {companies.map((c)=> (
              <button key={c.id} onClick={() => onSelectCompany(c.id)} className={`w-full text-left rounded-lg px-3 py-2 flex items-start gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 ${Number(companyId) === c.id?"bg-neutral-100 dark:bg-neutral-800":""}`}>
                <div className="mt-0.5"><Building2 className="h-4 w-4 text-neutral-500"/></div>
                <div>
                  <div className="font-medium flex items-center gap-2">{c.title} <span className="text-xs text-neutral-500 inline-flex items-center gap-1"><MapPin className="h-3 w-3"/>{c.city}</span></div>
                  <div className="text-xs text-neutral-500 line-clamp-1">{c.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyPicker;