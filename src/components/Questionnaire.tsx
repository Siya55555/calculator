import React, { useState } from 'react';
import styled from 'styled-components';
import { calculatePriceBreakdown, getProjectTypeName } from '../config/pricing';
import { jsPDF } from 'jspdf';


// Types
interface FormData {
  projectType: string;
  description: string;
  area: number;
  startDate: string;
  budget: string;
  location: string;
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

interface ProjectType {
  id: string;
  name: string;
  description: string;
}

// Project types data
const PROJECT_TYPES: ProjectType[] = [
  { id: 'totalrenovering', name: 'Totalrenovering', description: 'Full renovation of your property' },
  { id: 'delrenovering', name: 'Delrenovering', description: 'Partial renovation of specific areas' },
  { id: 'nybygg', name: 'Nybygg', description: 'New construction project' },
  { id: 'påbygg', name: 'Påbygg/Tilbygg', description: 'Extension or addition to existing building' },
  { id: 'loft', name: 'Loft eller kjeller', description: 'Attic or basement renovation' },
  { id: 'bad', name: 'Pusse opp bad', description: 'Bathroom renovation' },
  { id: 'garasje', name: 'Bygge garasje', description: 'Build garage' },
  { id: 'annet', name: 'Annet', description: 'Other project type' }
];

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 20px 40px 20px;
  font-family: 'Arial', sans-serif;
  
  @media (max-width: 768px) {
    padding: 15px 8px 60px 8px;
    max-width: 100%;
  }
`;

const StepContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 18px 8px 24px 8px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

const ProgressBarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

const ProgressLabel = styled.div`
  font-size: 1rem;
  color: #222;
  font-weight: 500;
`;

const ProgressPercent = styled.div`
  font-size: 0.95rem;
  color: #888;
  font-weight: 400;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  position: relative;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #19c6e6;
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const StepTitle = styled.h2`
  color: #222;
  margin: 18px 0 10px 0;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
`;

const StepCounter = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const StepNumber = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  margin: 0 5px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ProjectTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ProjectTypeCard = styled.div<{ selected: boolean }>`
  padding: 20px;
  border: 2px solid ${props => props.selected ? '#007bff' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#f8f9ff' : 'white'};

  &:hover {
    border-color: #007bff;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ProjectTypeName = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const ProjectTypeDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 22px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 16px;
  
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 17px;
  transition: border-color 0.2s ease;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 17px;
    min-height: 48px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 17px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 17px;
    min-height: 80px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 17px;
  background: white;
  transition: border-color 0.2s ease;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 17px;
    min-height: 48px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-top: 2px;
  min-width: 24px;
  min-height: 24px;
  accent-color: #007bff;
  @media (max-width: 768px) {
    min-width: 28px;
    min-height: 28px;
  }
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 16px 28px;
  border-radius: 6px;
  font-size: 17px;
  cursor: pointer;
  transition: background 0.2s ease;
  min-height: 48px;
  min-width: 44px;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 18px 20px;
    font-size: 17px;
    width: 100%;
    min-height: 52px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const PriceDisplay = styled.div`
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
  border-radius: 12px;
  margin-bottom: 20px;
`;

const PriceAmount = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PriceDescription = styled.div`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
`;

const PriceBreakdown = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
`;

const BreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;

const TestimonialsSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const TestimonialsTitle = styled.h3`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.3rem;
`;

const TestimonialCard = styled.div`
  background: #f8f9ff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  border-left: 4px solid #007bff;
`;

const TestimonialText = styled.p`
  color: #555;
  font-style: italic;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PDFButton = styled(Button)`
  background: #28a745;
  margin-top: 20px;
  
  &:hover {
    background: #218838;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RedStar = styled.span`
  color: red;
  margin-left: 2px;
`;

// Add a function to get the current step title
const stepTitles = [
  '',
  'Velg prosjekttype',
  'Prosjektdetaljer',
  'Lokasjon',
  'Kontaktinformasjon',
  'Din prisestimat',
];

const Questionnaire: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    description: '',
    area: 0,
    startDate: '',
    budget: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    consent: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      setIsLoading(true);
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPriceBreakdown = () => {
    return calculatePriceBreakdown(formData.projectType, formData.area);
  };

  const generatePDF = async () => {
    try {
      const breakdown = getPriceBreakdown();
      const pdf = new jsPDF();
      
      // Add company header
      pdf.setFontSize(24);
      pdf.setTextColor(0, 123, 255);
      pdf.text('Badbygg VVS', 20, 30);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Få ditt prisestimat på 2 minutter', 20, 40);
      
      // Add line separator
      pdf.setDrawColor(0, 123, 255);
      pdf.setLineWidth(0.5);
      pdf.line(20, 50, 190, 50);
      
      // Add quote details
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Prisestimat', 20, 70);
      
      pdf.setFontSize(12);
      pdf.text(`Prosjekttype: ${getProjectTypeName(formData.projectType)}`, 20, 85);
      pdf.text(`Areal: ${formData.area} m²`, 20, 95);
      pdf.text(`Lokasjon: ${formData.location}`, 20, 105);
      
      if (formData.description) {
        pdf.text(`Beskrivelse: ${formData.description.substring(0, 80)}${formData.description.length > 80 ? '...' : ''}`, 20, 115);
      }
      
      // Add price breakdown
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Prisoverslag:', 20, 140);
      
      pdf.setFontSize(12);
      pdf.text(`Materialer (60%): kr ${breakdown.materials.toLocaleString('no-NO')}`, 20, 155);
      pdf.text(`Arbeid (40%): kr ${breakdown.labor.toLocaleString('no-NO')}`, 20, 165);
      
      pdf.setFontSize(16);
      pdf.setTextColor(0, 123, 255);
      pdf.text(`Total: kr ${breakdown.total.toLocaleString('no-NO')}`, 20, 180);
      
      // Add contact information
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Kontaktinformasjon:', 20, 200);
      pdf.text(`Navn: ${formData.name}`, 20, 210);
      pdf.text(`E-post: ${formData.email}`, 20, 220);
      pdf.text(`Telefon: ${formData.phone}`, 20, 230);
      
      // Add footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Dette er et estimat basert på oppgitt informasjon. Kontakt oss for et detaljert tilbud.', 20, 250);
      pdf.text(`Generert: ${new Date().toLocaleDateString('no-NO')}`, 20, 260);
      
      // Save the PDF
      const fileName = `badbygg-vvs-estimat-${formData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Kunne ikke generere PDF. Prøv igjen.');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== '';
      case 2:
        return formData.description !== '' && formData.area > 0;
      case 3:
        return formData.location !== '';
      case 4:
        return formData.name !== '' && formData.email !== '' && formData.phone !== '' && formData.consent;
      default:
        return true;
    }
  };

  const renderStep1 = () => (
    <StepContainer>
      <Title>Velg prosjekttype</Title>
      <ProjectTypeGrid>
        {PROJECT_TYPES.map(type => (
          <ProjectTypeCard
            key={type.id}
            selected={formData.projectType === type.id}
            onClick={() => updateFormData('projectType', type.id)}
          >
            <ProjectTypeName>{type.name}</ProjectTypeName>
            <ProjectTypeDescription>{type.description}</ProjectTypeDescription>
          </ProjectTypeCard>
        ))}
      </ProjectTypeGrid>
    </StepContainer>
  );

  const renderStep2 = () => (
    <StepContainer>
      <Title>Prosjektdetaljer</Title>
      <FormGroup>
        <Label>Beskriv prosjektet ditt</Label>
        <TextArea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Beskriv hva du ønsker å gjøre..."
        />
      </FormGroup>
      <FormGroup>
        <Label>Areal (m²)</Label>
        <Input
          type="number"
          value={formData.area}
          onChange={(e) => updateFormData('area', Number(e.target.value))}
          placeholder="F.eks. 50"
        />
      </FormGroup>
      <FormGroup>
        <Label>Ønsket startdato</Label>
        <Select
          value={formData.startDate}
          onChange={(e) => updateFormData('startDate', e.target.value)}
        >
          <option value="">Velg startdato</option>
          <option value="asap">Så snart som mulig</option>
          <option value="1month">Innen 1 måned</option>
          <option value="3months">Innen 3 måneder</option>
          <option value="6months">Innen 6 måneder</option>
          <option value="flexible">Fleksibelt</option>
        </Select>
      </FormGroup>
    </StepContainer>
  );

  const renderStep3 = () => (
    <StepContainer>
      <Title>Lokasjon</Title>
      <FormGroup>
        <Label>Adresse eller postnummer</Label>
        <Input
          type="text"
          value={formData.location}
          onChange={(e) => updateFormData('location', e.target.value)}
          placeholder="F.eks. Oslo, 0123"
        />
      </FormGroup>
    </StepContainer>
  );

  const renderStep4 = () => (
    <StepContainer>
      <Title>Kontaktinformasjon</Title>
      <FormGroup>
        <Label>Navn <span style={{ color: 'red', marginLeft: 2 }}>*</span></Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Ditt navn"
        />
      </FormGroup>
      <FormGroup>
        <Label>E-post <span style={{ color: 'red', marginLeft: 2 }}>*</span></Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="din@email.no"
        />
      </FormGroup>
      <FormGroup>
        <Label>Telefon <span style={{ color: 'red', marginLeft: 2 }}>*</span></Label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          placeholder="123 45 678"
        />
      </FormGroup>
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={formData.consent}
          onChange={(e) => updateFormData('consent', e.target.checked)}
        />
        <Label style={{ margin: 0, fontWeight: 'normal' }}>
          Jeg godtar at Badbygg VVS kan kontakte meg angående dette prosjektet
        </Label>
      </CheckboxContainer>
    </StepContainer>
  );

  const renderStep5 = () => {
    const breakdown = getPriceBreakdown();
    
    return (
      <>
        <StepContainer>
          <Title>Din prisestimat</Title>
          <PriceDisplay>
            <PriceAmount>kr {breakdown.total.toLocaleString('no-NO')}</PriceAmount>
            <PriceDescription>
              Basert på {getProjectTypeName(formData.projectType)} på {formData.area} m²
            </PriceDescription>
          </PriceDisplay>
          
          <PriceBreakdown>
            <BreakdownItem>
              <span>Materialer (60%)</span>
              <span>kr {breakdown.materials.toLocaleString('no-NO')}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Arbeid (40%)</span>
              <span>kr {breakdown.labor.toLocaleString('no-NO')}</span>
            </BreakdownItem>
            <BreakdownItem>
              <span>Total</span>
              <span>kr {breakdown.total.toLocaleString('no-NO')}</span>
            </BreakdownItem>
          </PriceBreakdown>
          
          <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
            Vi vil kontakte deg innen kort tid for å diskutere prosjektet ditt og gi deg et mer detaljert tilbud.
          </p>
          
          <PDFButton onClick={generatePDF}>
            📄 Lagre som PDF
          </PDFButton>
        </StepContainer>
        
        <TestimonialsSection>
          <TestimonialsTitle>Hva våre kunder sier</TestimonialsTitle>
          <TestimonialCard>
            <TestimonialText>
              "Badbygg VVS gjorde en fantastisk jobb med badrenoveringen vår. Profesjonell service og kvalitetsarbeid!"
            </TestimonialText>
            <TestimonialAuthor>- Mari og Erik, Oslo</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>
              "Rask levering og god kommunikasjon gjennom hele prosessen. Anbefales på det sterkeste!"
            </TestimonialText>
            <TestimonialAuthor>- Lars Hansen, Bergen</TestimonialAuthor>
          </TestimonialCard>
          <TestimonialCard>
            <TestimonialText>
              "Fikk et ærlig tilbud og jobben ble gjort til avtalt pris og tid. Veldig fornøyd!"
            </TestimonialText>
            <TestimonialAuthor>- Anne Kristin, Trondheim</TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsSection>
      </>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return null;
    }
  };

  return (
    <Container>
      <ProgressBarContainer>
        <ProgressBarRow>
          <ProgressLabel>Steg {currentStep} av {totalSteps}</ProgressLabel>
          <ProgressPercent>{Math.round(progress)}% fullført</ProgressPercent>
        </ProgressBarRow>
        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>
        <StepTitle>{stepTitles[currentStep]}</StepTitle>
      </ProgressBarContainer>

      {renderCurrentStep()}

      <ButtonContainer>
        {currentStep > 1 && (
          <Button onClick={prevStep} disabled={isLoading}>
            Tilbake
          </Button>
        )}
        {currentStep < totalSteps && (
          <LoadingButton onClick={nextStep} disabled={!canProceed() || isLoading}>
            {isLoading ? (
              <>
                <LoadingSpinner />
                Beregner...
              </>
            ) : (
              'Neste'
            )}
          </LoadingButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Questionnaire; 