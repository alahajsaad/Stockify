import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardBody, CardHeader } from "src/components/ui/Card";
import { Company } from "src/types";


interface CompanyInfoProps {
  company: Company;
}
const CompanyInfo : React.FC<CompanyInfoProps> = ({company}) => {
     
return (
    <Card className="h-fit">
      <CardHeader>
        <Building2 className="h-5 w-5" />
        <span>Company Information</span>
      </CardHeader>
      <CardBody className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">{company.name}</h3>
          <div className="space-y-3 text-sm">
            {company.taxNumber && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Tax: {company.taxNumber}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{company.email}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{company.phone}</span>
          </div>
          
          <div className="flex items-start space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <div>{company.city}</div>
              <div>{company.address}, {company.zipCode}</div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            créé à {company.createdAt}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
export default CompanyInfo ;