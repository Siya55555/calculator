import React, { useState } from 'react';
import styled from 'styled-components';
import { calculatePrice, getProjectTypeName } from '../config/pricing';

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
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const StepContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-bottom: 30px;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: #007bff;
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
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
`;

const ProjectTypeName = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
  font-size: 16px;
`;

const ProjectTypeDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 14px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
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
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const PriceDisplay = styled.div`
  background: #f8f9fa;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
`;

const PriceAmount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

const PriceDescription = styled.p`
  color: #666;
  margin: 0;
`;

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

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPriceEstimate = () => {
    return calculatePrice(formData.projectType, formData.area);
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
        <Label>Navn *</Label>
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          placeholder="Ditt navn"
        />
      </FormGroup>
      <FormGroup>
        <Label>E-post *</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          placeholder="din@email.no"
        />
      </FormGroup>
      <FormGroup>
        <Label>Telefon *</Label>
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

  const renderStep5 = () => (
    <StepContainer>
      <Title>Din prisestimat</Title>
      <PriceDisplay>
        <PriceAmount>kr {getPriceEstimate()}</PriceAmount>
        <PriceDescription>
          Basert på {getProjectTypeName(formData.projectType)} på {formData.area} m²
        </PriceDescription>
      </PriceDisplay>
      <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        Vi vil kontakte deg innen kort tid for å diskutere prosjektet ditt og gi deg et mer detaljert tilbud.
      </p>
    </StepContainer>
  );

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
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      
      {renderCurrentStep()}

      <ButtonContainer>
        {currentStep > 1 && (
          <Button onClick={prevStep}>
            Tilbake
          </Button>
        )}
        {currentStep < totalSteps && (
          <Button onClick={nextStep} disabled={!canProceed()}>
            Neste
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default Questionnaire; 