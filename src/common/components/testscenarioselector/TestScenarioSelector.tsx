import { Button, Heading, Modal, Radio, RadioGroup } from "@navikt/ds-react";
import styled from "styled-components";
import Sun from "@navikt/ds-icons/svg/Sun.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Row } from "../wrappers/Row";
import { SpacedDiv } from "../wrappers/SpacedDiv";
import { TestScenario } from "server/data/mock/getMockDb";
import {
  useActiveTestScenario,
  useSetActiveTestScenario,
} from "@/common/api/queries/testScenarioQueries";

const MockdataWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999999;
  height: 3rem;
  width: 3rem;
  background-color: #9bd0b0;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  cursor: pointer;

  &:hover {
    background-color: #8bbb9e;
  }
`;

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

const Content = styled.div`
  padding: 3rem;
`;

export const TestScenarioSelector = () => {
  const activeTestScenario = useActiveTestScenario();
  const setActiveTestScenario = useSetActiveTestScenario();
  const [open, setOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<
    TestScenario | undefined
  >();

  useEffect(() => {
    if (Modal.setAppElement) {
      Modal.setAppElement("#__next");
    }
  }, []);

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
        <Modal.Content>
          <Content>
            <Heading spacing level="1" size="large">
              Velg testscenario
            </Heading>

            <SpacedDiv marginBottom={"1rem"}>
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
            </SpacedDiv>

            <Row>
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
            </Row>
          </Content>
        </Modal.Content>
      </Modal>

      <MockdataWrapper onClick={() => setOpen(!open)}>
        <Image src={Sun} width={50} height={50} alt={""} color={"#FF0000"} />
      </MockdataWrapper>
    </>
  );
};
