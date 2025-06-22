import { useGetPartnerById } from "@/services/api/partner/hooks";
import { User, Building2, Mail, Phone, MapPin, Calendar, Hash, FileText } from "lucide-react";
import { useParams } from "react-router-dom";


const PartnerDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : -1;
    const { data: partner, isPending } = useGetPartnerById(numericId);
 
  

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Partner not found</h3>
          <p className="text-gray-500">The partner you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPartnerTypeColor = (type: string) => {
    return type === 'SUPPLIER' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-8 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-full shadow-md">
                {partner.entityType === 'PERSON' ? (
                  <User className="h-8 w-8 text-blue-600" />
                ) : (
                  <Building2 className="h-8 w-8 text-blue-600" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {partner.entityType === 'PERSON' 
                    ? partner.fullName 
                    : partner.companyName}
                </h1>
                <p className="text-gray-600 mt-1">
                  {partner.entityType === 'PERSON' ? 'Individual' : 'Organization'}
                </p>
              </div>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPartnerTypeColor(partner.partnerType)}`}>
              {partner.partnerType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Hash className="h-5 w-5 mr-2 text-gray-500" />
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900 font-medium">{partner.email}</span>
                  </div>
                  
                  {partner.entityType === 'PERSON' ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">First Name:</span>
                        <span className="text-gray-900 font-medium">{partner.firstName}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Last Name:</span>
                        <span className="text-gray-900 font-medium">{partner.lastName}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Registration Number:</span>
                        <span className="text-gray-900 font-medium">{partner.registrationNumber}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">Tax Number:</span>
                        <span className="text-gray-900 font-medium">{partner.taxNumber}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Phone Numbers */}
              {partner.phoneNumbers && partner.phoneNumbers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-gray-500" />
                    Phone Numbers
                  </h3>
                  <div className="space-y-2">
                    {partner.phoneNumbers.map((phone, index) => (
                      <div key={phone.id || index} className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-900 font-medium">{phone.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Addresses */}
              {partner.addresses && partner.addresses.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                    Addresses
                  </h3>
                  <div className="space-y-4">
                    {partner.addresses.map((address, index) => (
                      <div key={address.id || index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-gray-900 font-medium">{address.streetAddress}</p>
                            <p className="text-gray-600">{address.city}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Created:</span>
                    <span className="text-gray-900 font-medium">{formatDate(partner.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Updated:</span>
                    <span className="text-gray-900 font-medium">{formatDate(partner.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;