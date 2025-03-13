import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  FileText,
  Camera,
  Shield,
  Clock,
  X,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface KycVerificationProps {
  isLoggedIn?: boolean;
  userStatus?: "not-started" | "in-progress" | "verified" | "rejected";
}

const KycVerification: React.FC<KycVerificationProps> = ({
  isLoggedIn = true,
  userStatus = "not-started",
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [status, setStatus] = useState(userStatus);
  const [progress, setProgress] = useState(() => {
    switch (userStatus) {
      case "verified":
        return 100;
      case "rejected":
        return 80;
      case "in-progress":
        return 60;
      default:
        return 0;
    }
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (documentType: string) => {
    // In a real implementation, this would open a file picker
    console.log(`Uploading ${documentType}`);

    // Simulate file upload
    setDocuments({
      ...documents,
      [documentType]: { name: `${documentType}.jpg`, size: "1.2 MB" },
    });

    // Update progress
    if (status === "not-started") {
      setStatus("in-progress");
      setProgress(20);
    } else if (status === "in-progress") {
      setProgress(Math.min(progress + 20, 80));
    }
  };

  const handleSubmit = () => {
    // In a real implementation, this would submit the KYC information to the server
    console.log("Submitting KYC information");
    setStatus("in-progress");
    setProgress(80);
    // Simulate verification process
    setTimeout(() => {
      setStatus("verified");
      setProgress(100);
    }, 2000);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Verified
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Not Started
          </Badge>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 p-8 rounded-lg">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Please log in to access the KYC verification process.
        </p>
        <Button size="lg">Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">KYC Verification</h1>
          <p className="text-gray-500 mt-1">
            Complete your identity verification to unlock all features
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {getStatusBadge()}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Verification Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {status === "rejected" && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>
            Your verification was rejected. Please check the comments below and
            resubmit with the correct information.
          </AlertDescription>
        </Alert>
      )}

      {status === "verified" ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Verification Complete</CardTitle>
                <CardDescription>
                  Your identity has been successfully verified
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-green-50 rounded-lg border border-green-100 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Verification Successful
              </h3>
              <p className="text-green-700 mb-4">
                Your KYC verification is complete. You now have full access to
                all features.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">View Verification Details</Button>
                <Button>Continue to Dashboard</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Verification</CardTitle>
            <CardDescription>
              Please provide the required information and documents to verify
              your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Personal Information
                  </div>
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Document Upload
                  </div>
                </TabsTrigger>
                <TabsTrigger value="review">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Review & Submit
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={personalInfo.nationality}
                      onChange={handlePersonalInfoChange}
                      placeholder="United States"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={personalInfo.address}
                    onChange={handlePersonalInfoChange}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={personalInfo.city}
                      onChange={handlePersonalInfoChange}
                      placeholder="New York"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={personalInfo.country}
                      onChange={handlePersonalInfoChange}
                      placeholder="United States"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={personalInfo.postalCode}
                      onChange={handlePersonalInfoChange}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={() => setActiveTab("documents")}>
                    Continue to Document Upload
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        ID Card (Front)
                      </CardTitle>
                      <CardDescription>
                        Upload the front side of your government-issued ID
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {documents.idFront ? (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">
                                {documents.idFront.name}
                              </span>
                            </div>
                            <Badge variant="outline">
                              {documents.idFront.size}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleFileUpload("idFront")}
                        >
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG or PDF (max. 5MB)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        ID Card (Back)
                      </CardTitle>
                      <CardDescription>
                        Upload the back side of your government-issued ID
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {documents.idBack ? (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">
                                {documents.idBack.name}
                              </span>
                            </div>
                            <Badge variant="outline">
                              {documents.idBack.size}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleFileUpload("idBack")}
                        >
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG or PDF (max. 5MB)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Selfie with ID
                      </CardTitle>
                      <CardDescription>
                        Take a photo of yourself holding your ID
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {documents.selfie ? (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">
                                {documents.selfie.name}
                              </span>
                            </div>
                            <Badge variant="outline">
                              {documents.selfie.size}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleFileUpload("selfie")}
                        >
                          <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to take a photo or upload
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG or JPG (max. 5MB)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Proof of Address
                      </CardTitle>
                      <CardDescription>
                        Upload a utility bill or bank statement (not older than
                        3 months)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {documents.proofOfAddress ? (
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <span className="font-medium">
                                {documents.proofOfAddress.name}
                              </span>
                            </div>
                            <Badge variant="outline">
                              {documents.proofOfAddress.size}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleFileUpload("proofOfAddress")}
                        >
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG or PDF (max. 5MB)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("personal")}
                  >
                    Back to Personal Information
                  </Button>
                  <Button onClick={() => setActiveTab("review")}>
                    Continue to Review
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="review" className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">
                      Verification Notice
                    </h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Please review your information carefully before
                      submitting. The verification process typically takes 1-3
                      business days.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Full Name</div>
                      <div className="font-medium">
                        {personalInfo.firstName || "[Not provided]"}{" "}
                        {personalInfo.lastName || ""}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">Date of Birth</div>
                      <div className="font-medium">
                        {personalInfo.dateOfBirth
                          ? new Date(
                              personalInfo.dateOfBirth,
                            ).toLocaleDateString()
                          : "[Not provided]"}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="font-medium">
                      {personalInfo.address
                        ? `${personalInfo.address}, ${personalInfo.city}, ${personalInfo.country} ${personalInfo.postalCode}`
                        : "[Not provided]"}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Uploaded Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          ID Card (Front)
                        </div>
                        <div className="font-medium">
                          {documents.idFront
                            ? documents.idFront.name
                            : "[Not uploaded]"}
                        </div>
                      </div>
                      {documents.idFront ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          ID Card (Back)
                        </div>
                        <div className="font-medium">
                          {documents.idBack
                            ? documents.idBack.name
                            : "[Not uploaded]"}
                        </div>
                      </div>
                      {documents.idBack ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          Selfie with ID
                        </div>
                        <div className="font-medium">
                          {documents.selfie
                            ? documents.selfie.name
                            : "[Not uploaded]"}
                        </div>
                      </div>
                      {documents.selfie ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-500">
                          Proof of Address
                        </div>
                        <div className="font-medium">
                          {documents.proofOfAddress
                            ? documents.proofOfAddress.name
                            : "[Not uploaded]"}
                        </div>
                      </div>
                      {documents.proofOfAddress ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("documents")}
                  >
                    Back to Documents
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            onClick={handleSubmit}
                            disabled={
                              !personalInfo.firstName ||
                              !personalInfo.lastName ||
                              !personalInfo.dateOfBirth ||
                              !documents.idFront ||
                              !documents.idBack
                            }
                          >
                            Submit Verification
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {(!personalInfo.firstName ||
                        !personalInfo.lastName ||
                        !personalInfo.dateOfBirth ||
                        !documents.idFront ||
                        !documents.idBack) && (
                        <TooltipContent>
                          <p>
                            Please complete all required fields before
                            submitting
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Your Data is Secure</h4>
                <p className="text-sm text-gray-500">
                  All information is encrypted and securely stored according to
                  industry standards.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Need Help?</h4>
                <p className="text-sm text-gray-500">
                  Contact our support team if you have any questions about the
                  verification process.
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default KycVerification;
