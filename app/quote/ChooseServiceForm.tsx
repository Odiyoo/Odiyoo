
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormData } from "./page"
import { useSearchParams } from "next/navigation";
import StepNoMeasurements from "./StepNoMeasurements";
import StepService from "./StepService";
import StepMeasurements from "./StepMeasurements";
import LoadingStep from "./LoadingStep";

type ChooseServiceFormProps = {
    formData: FormData,
    setFormData: Dispatch<SetStateAction<FormData>>,
    handleStep1Complete: any,
};

export type Service = 'dakreiniging' | 'dakrenovatie' | null;

export default function ChooseServiceForm({ formData, setFormData, handleStep1Complete }: ChooseServiceFormProps) {

    const [service, setService] = useState<Service>(null);
    const [isMeasurementKnown, setIsMeasurementKnown] = useState();
    const [subStep, setSubStep] = useState<'ServiceStep' | 'MeasurementStep' | 'NoMeasurementStep' | 'LoadingStep'>('LoadingStep');
    const [subStepContent, setSubStepContent] = useState<React.ReactNode>(<StepService service={service} setService={setService}/>);

    
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get('service');
    const measurementsParam = searchParams.get('measurements');

    /* On page load */
    useEffect(() => {
        if (serviceParam && measurementsParam === 'true') {
            setService(serviceParam)
        } else if (serviceParam && measurementsParam === 'false') {
            setSubStep('NoMeasurementStep')
        } else {
            setSubStep('ServiceStep')
        }
    }, [])    

    

    /* When step changes, show new step */
    useEffect(() => {
        switch (subStep) {
            case 'ServiceStep':
                setSubStepContent(<StepService service={service} setService={setService}/>)
                break;
            case 'MeasurementStep':
                setSubStepContent(<StepMeasurements isMeasurementKnown={isMeasurementKnown} setIsMeasurementKnown={setIsMeasurementKnown}/>)
                break;
            case 'NoMeasurementStep':
                setSubStepContent(<StepNoMeasurements formData={formData}/>)
                break;
            case 'LoadingStep':
                setSubStepContent(<LoadingStep/>)
                break;
            default:
                setSubStepContent(<LoadingStep/>)
                break;
        }
    }, [subStep])

    /* When service is selected, change step */
    useEffect(() => {
        if (service != null) {
            /* let parent know what service has been selected */
            setFormData(formdata => ({...formdata, ["service"]: service}))
            setSubStep('MeasurementStep')
            setIsMeasurementKnown(measurementsParam)
        }
    }, [service])

    /* When measurement info is given, change step */
    useEffect(() => {
        if (subStep === 'MeasurementStep' && isMeasurementKnown !== null) {
            setSubStep(isMeasurementKnown ? handleStep1Complete() : 'NoMeasurementStep')
        }
    }, [isMeasurementKnown])

    return (
        <>
            {subStepContent}
        </>
    );
}