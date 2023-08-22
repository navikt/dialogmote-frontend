import { Button, Heading, Modal, Radio, RadioGroup } from "@navikt/ds-react";
import SunImage from "../../images/sun.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TestScenario } from "server/data/mock/getMockDb";
import {
  useActiveTestScenario,
  useSetActiveTestScenario,
} from "@/common/api/queries/testScenarioQueries";
import styles from "./testscenarioselector.module.css";

interface RadioProps {
  value: TestScenario;
  helpText: string;
  children: string;
}

const RadioWithHelpText = ({ value, helpText, children }: RadioProps) => {
  return (
    <div title={helpText}>
      <Radio value={value}>{children}</Radio>
    </div>
  );
};

export const TestScenarioSelector = () => {
  const activeTestScenario = useActiveTestScenario();
  const setActiveTestScenario = useSetActiveTestScenario();
  const [open, setOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    TestScenario | undefined
  >();

  useEffect(() => {
    if (activeTestScenario.isSuccess) {
      setSelectedScenario(activeTestScenario.data);
    }
  }, [activeTestScenario.data, activeTestScenario.isSuccess]);

  if (!selectedScenario) return null;

  return (
    <>
      <Modal
        open={open}
        aria-label="Testdatavelger"
        onClose={() => setOpen(false)}
      >
        <Modal.Body>
          <div className="p-12">
            <Heading spacing level="1" size="large">
              Velg testscenario
            </Heading>

            <div className="mb-4">
              <RadioGroup
                legend="Velg testscenario"
                value={selectedScenario}
                hideLegend={true}
                onChange={(val: TestScenario) => {
                  setSelectedScenario(val);
                }}
              >
                <RadioWithHelpText
                  value={"MELD_BEHOV"}
                  helpText={
                    "Jeg har muligheten for å melde inn behov for Dialogmøte"
                  }
                >
                  Meld møtebehov
                </RadioWithHelpText>

                <RadioWithHelpText
                  value={"SVAR_BEHOV"}
                  helpText={
                    "Jeg har fått spørsmål om jeg trenger dialogmøte fra NAV"
                  }
                >
                  Svar på møtebehov
                </RadioWithHelpText>

                <RadioWithHelpText
                  value={"DIALOGMOTE_INNKALLING"}
                  helpText={"Jeg har blitt innkalt til Dialogmote"}
                >
                  Innkalling til Dialogmøte
                </RadioWithHelpText>

                <RadioWithHelpText
                  value={"DIALOGMOTE_AVLYST"}
                  helpText={"Dialogmøtet har blitt avlyst"}
                >
                  Avlyst Dialogmøte
                </RadioWithHelpText>

                <RadioWithHelpText
                  value={"DIALOGMOTE_ENDRET"}
                  helpText={"Dialogmøtet har blitt endret"}
                >
                  Endret Dialogmøte
                </RadioWithHelpText>
              </RadioGroup>
            </div>

            <div className="flex flex-row flex-wrap">
              <Button
                variant={"primary"}
                disabled={!setActiveTestScenario}
                onClick={() => {
                  setActiveTestScenario.mutate(selectedScenario);
                  setOpen(false);
                }}
              >
                Velg scenario
              </Button>
              <Button variant={"tertiary"} onClick={() => setOpen(false)}>
                Avbryt
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div
        id="TestScenarioSelector"
        onClick={() => setOpen(!open)}
        className={styles.testscenariocontainer}
      >
        <Image src={SunImage} alt="" width={40} height={40} />
      </div>
    </>
  );
};
