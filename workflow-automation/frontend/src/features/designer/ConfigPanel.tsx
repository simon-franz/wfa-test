import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDesignerStore } from '../../stores/designer.store';
import { ContextPanel } from './ContextPanel';
import { ContextInput } from './components/ContextInput';

const PanelContainer = styled.div`
  width: 320px;
  background-color: var(--color-white);
  border-left: 1px solid var(--color-gray-200);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4);
  border-bottom: 1px solid var(--color-gray-200);
  flex-shrink: 0;
`;

const PanelTitle = styled.h3`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const CloseButton = styled.button`
  padding: var(--spacing-1);
  color: var(--color-gray-500);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-lg);

  &:hover {
    color: var(--color-gray-700);
  }
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-4);
  min-height: 0;
`;

const FormGroup = styled.div`
  margin-bottom: var(--spacing-4);
`;

const Label = styled.label`
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-700);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  background-color: var(--color-white);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  resize: vertical;
  min-height: 80px;
  font-family: monospace;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: var(--spacing-3);
  color: var(--color-danger);
  background: none;
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-6);

  &:hover {
    background-color: var(--color-danger);
    color: var(--color-white);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-gray-200);
  margin: var(--spacing-4) 0;
`;

const SectionTitle = styled.h4`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-gray-700);
  margin: 0 0 var(--spacing-3) 0;
`;

// HR WORKS Endpoint Parameter Definitions
const HRWORKS_ENDPOINT_PARAMS: Record<string, Array<{ name: string; label: string; type: string; required?: boolean }>> = {
  'persons.getById': [
    { name: 'id', label: 'Person ID', type: 'text', required: true },
  ],
  'persons.create': [
    { name: 'personId', label: 'Person ID (Login)', type: 'text', required: true },
    { name: 'personnelNumber', label: 'Personalnummer', type: 'text', required: true },
    { name: 'firstName', label: 'Vorname', type: 'text', required: false },
    { name: 'lastName', label: 'Nachname', type: 'text', required: false },
    { name: 'email', label: 'E-Mail', type: 'email', required: false },
    { name: 'birthday', label: 'Geburtstag (YYYY-MM-DD)', type: 'text', required: false },
    { name: 'gender', label: 'Geschlecht', type: 'select', required: false, options: [
      { value: 'male', label: 'Männlich' },
      { value: 'female', label: 'Weiblich' },
      { value: 'diverse', label: 'Divers' },
    ]},
    { name: 'joinDate', label: 'Eintrittsdatum (YYYY-MM-DD)', type: 'text', required: false },
    { name: 'organizationUnitNumber', label: 'Organisationseinheit Nr.', type: 'text', required: false },
    { name: 'position', label: 'Position', type: 'text', required: false },
    { name: 'employmentType', label: 'Beschäftigungsart', type: 'select', required: false, options: [
      { value: 'regularEmployee', label: 'Regulärer Mitarbeiter' },
      { value: 'apprentice', label: 'Auszubildender' },
      { value: 'intern', label: 'Praktikant' },
      { value: 'marginalEmployment', label: 'Geringfügige Beschäftigung' },
      { value: 'shortTermEmployment', label: 'Kurzfristige Beschäftigung' },
      { value: 'studentTrainee', label: 'Werkstudent' },
      { value: 'externalWorker', label: 'Externe Arbeitskraft' },
    ]},
  ],
  'persons.update': [
    { name: 'id', label: 'Person ID', type: 'text', required: true },
    { name: 'firstName', label: 'Vorname', type: 'text' },
    { name: 'lastName', label: 'Nachname', type: 'text' },
    { name: 'email', label: 'E-Mail', type: 'email' },
  ],
  'absences.create': [
    { name: 'personId', label: 'Person ID', type: 'text', required: true },
    { name: 'startDate', label: 'Startdatum', type: 'date', required: true },
    { name: 'endDate', label: 'Enddatum', type: 'date', required: true },
    { name: 'type', label: 'Typ', type: 'text', required: true },
  ],
  'organizationUnits.getById': [
    { name: 'id', label: 'OE ID', type: 'text', required: true },
  ],
};

export function ConfigPanel() {
  const { nodes, selectedNodeId, selectNode, updateNodeName, updateNodeConfig, deleteNode } =
    useDesignerStore();

  const [contextPanelVisible, setContextPanelVisible] = useState(false);
  const [contextPanelPosition, setContextPanelPosition] = useState<{ top: number }>({ top: 60 });
  const [activeInputKey, setActiveInputKey] = useState<string>('');

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Close context panel when node selection changes
  useEffect(() => {
    setContextPanelVisible(false);
  }, [selectedNodeId]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedNodeId) {
        updateNodeName(selectedNodeId, e.target.value);
      }
    },
    [selectedNodeId, updateNodeName],
  );

  const handleConfigChange = useCallback(
    (key: string, value: unknown) => {
      if (selectedNode) {
        updateNodeConfig(selectedNodeId!, {
          ...selectedNode.data.config,
          [key]: value,
        });
      }
    },
    [selectedNode, selectedNodeId, updateNodeConfig],
  );

  const handleDelete = useCallback(() => {
    if (selectedNodeId && window.confirm('Möchten Sie diesen Knoten wirklich löschen?')) {
      deleteNode(selectedNodeId);
    }
  }, [selectedNodeId, deleteNode]);

  const handleInputFocus = useCallback((inputKey: string, rect: DOMRect) => {
    setActiveInputKey(inputKey);
    setContextPanelPosition({ top: rect.top });
    setContextPanelVisible(true);
  }, []);

  const handleCloseContextPanel = useCallback(() => {
    setContextPanelVisible(false);
  }, []);

  const handleSelectVariable = useCallback(
    (variable: string) => {
      if (!selectedNode || !activeInputKey) return;

      console.log('handleSelectVariable:', { variable, activeInputKey, config: selectedNode.data.config });

      // Handle nested keys like "parameters.id"
      if (activeInputKey.startsWith('parameters.')) {
        const paramName = activeInputKey.replace('parameters.', '');
        const parameters = (selectedNode.data.config.parameters as Record<string, string>) || {};
        const currentValue = parameters[paramName] || '';
        const newValue = currentValue + variable;

        handleConfigChange('parameters', {
          ...parameters,
          [paramName]: newValue,
        });
      } else if (activeInputKey === 'expression' && selectedNode.data.config.conditions) {
        // For condition nodes with multiple conditions, we need to update the active condition
        // Since we don't track which condition is being edited, we'll update the first one
        // This is a limitation - ideally we'd track the condition index
        const conditions = selectedNode.data.config.conditions as any[];
        if (conditions.length > 0) {
          const updatedConditions = [...conditions];
          updatedConditions[0] = {
            ...updatedConditions[0],
            expression: (updatedConditions[0].expression || '') + variable,
          };
          handleConfigChange('conditions', updatedConditions);
        }
      } else {
        const currentValue = (selectedNode.data.config[activeInputKey] as string) || '';
        const newValue = currentValue + variable;
        handleConfigChange(activeInputKey, newValue);
      }
    },
    [selectedNode, activeInputKey, handleConfigChange],
  );

  if (!selectedNode) {
    return null;
  }

  const { label, nodeType, config } = selectedNode.data;

  const renderConfig = () => {
    switch (nodeType) {
      case 'manual-trigger':
        return (
          <FormGroup>
            <Label>Beschreibung</Label>
            <ContextInput
              multiline
              value={(config.description as string) || ''}
              onChange={(e) => handleConfigChange('description', e.target.value)}
              onFocus={(rect) => handleInputFocus('description', rect)} 
              placeholder="Optionale Beschreibung..."
            />
          </FormGroup>
        );

      case 'scheduled-trigger':
        return (
          <>
            <FormGroup>
              <Label>Cron Expression</Label>
              <ContextInput
                value={(config.cronExpression as string) || ''}
                onChange={(e) => handleConfigChange('cronExpression', e.target.value)}
                onFocus={(rect) => handleInputFocus('cronExpression', rect)} 
                placeholder="0 9 * * 1-5"
              />
            </FormGroup>
            <FormGroup>
              <Label>Zeitzone</Label>
              <Select
                value={(config.timezone as string) || 'Europe/Berlin'}
                onChange={(e) => handleConfigChange('timezone', e.target.value)}
              >
                <option value="Europe/Berlin">Europe/Berlin</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="UTC">UTC</option>
              </Select>
            </FormGroup>
          </>
        );

      case 'http-request':
        return (
          <>
            <FormGroup>
              <Label>HTTP Methode</Label>
              <Select
                value={(config.method as string) || 'GET'}
                onChange={(e) => handleConfigChange('method', e.target.value)}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>URL</Label>
              <ContextInput
                value={(config.url as string) || ''}
                onChange={(e) => handleConfigChange('url', e.target.value)}
                onFocus={(rect) => handleInputFocus('url', rect)} 
                placeholder="https://api.example.com/endpoint"
              />
            </FormGroup>
            <FormGroup>
              <Label>Body (JSON)</Label>
              <ContextInput
                multiline
                value={(config.body as string) || ''}
                onChange={(e) => handleConfigChange('body', e.target.value)}
                onFocus={(rect) => handleInputFocus('body', rect)} 
                placeholder='{"key": "value"}'
              />
            </FormGroup>
            <FormGroup>
              <Label>Timeout (ms)</Label>
              <Input
                type="number"
                value={(config.timeout as number) || 30000}
                onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value))}
              />
            </FormGroup>
          </>
        );

      case 'condition':
        const conditions = (config.conditions as any[]) || [
          { id: 'condition-1', label: 'Condition 1', expression: 'true' },
        ];
        const enableDefault = config.enableDefault !== false;

        return (
          <>
            <FormGroup>
              <Label>Bedingungen (First-Match)</Label>
              {conditions.map((condition, index) => (
                <div key={condition.id} style={{ marginBottom: 'var(--spacing-3)' }}>
                  <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                    <Input
                      placeholder="Label"
                      value={condition.label}
                      onChange={(e) => {
                        const newConditions = [...conditions];
                        newConditions[index].label = e.target.value;
                        handleConfigChange('conditions', newConditions);
                      }}
                      style={{ flex: 1 }}
                    />
                    <button
                      onClick={() => {
                        const newConditions = conditions.filter((_, i) => i !== index);
                        handleConfigChange('conditions', newConditions);
                      }}
                      style={{
                        padding: 'var(--spacing-2)',
                        background: 'var(--color-danger)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <ContextInput
                    multiline
                    value={condition.expression}
                    onChange={(e) => {
                      const newConditions = [...conditions];
                      newConditions[index].expression = e.target.value;
                      handleConfigChange('conditions', newConditions);
                    }}
                    onFocus={(rect) => handleInputFocus('expression', rect)}
                    placeholder="amount > 1000"
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  const newConditions = [
                    ...conditions,
                    {
                      id: `condition-${Date.now()}`,
                      label: `Condition ${conditions.length + 1}`,
                      expression: 'true',
                    },
                  ];
                  handleConfigChange('conditions', newConditions);
                }}
                style={{
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                + Bedingung hinzufügen
              </button>
            </FormGroup>
            <FormGroup>
              <Label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                <input
                  type="checkbox"
                  checked={enableDefault}
                  onChange={(e) => handleConfigChange('enableDefault', e.target.checked)}
                />
                Default-Pfad aktivieren
              </Label>
            </FormGroup>
          </>
        );

      case 'delay':
        return (
          <>
            <FormGroup>
              <Label>Dauer</Label>
              <Input
                type="number"
                value={(config.duration as number) || 5}
                onChange={(e) => handleConfigChange('duration', parseInt(e.target.value))}
                min={1}
              />
            </FormGroup>
            <FormGroup>
              <Label>Einheit</Label>
              <Select
                value={(config.unit as string) || 'seconds'}
                onChange={(e) => handleConfigChange('unit', e.target.value)}
              >
                <option value="seconds">Sekunden</option>
                <option value="minutes">Minuten</option>
                <option value="hours">Stunden</option>
                <option value="days">Tage</option>
              </Select>
            </FormGroup>
          </>
        );

      case 'data-transform':
        return (
          <>
            <FormGroup>
              <Label>Operation</Label>
              <Select
                value={(config.operation as string) || ''}
                onChange={(e) => {
                  updateNodeConfig(selectedNodeId!, {
                    ...config,
                    operation: e.target.value,
                  });
                }}
              >
                <option value="">-- Wählen --</option>
                <option value="count">Anzahl (Count)</option>
                <option value="extract">Feld extrahieren</option>
                <option value="filter">Filtern</option>
                <option value="map">Transformieren (Map)</option>
                <option value="sum">Summe</option>
                <option value="average">Durchschnitt</option>
              </Select>
            </FormGroup>
            
            {config.operation && (
              <>
                <FormGroup>
                  <Label>Eingabe-Pfad</Label>
                  <ContextInput
                    value={(config.inputPath as string) || ''}
                    onChange={(e) => handleConfigChange('inputPath', e.target.value)}
                    onFocus={(rect) => handleInputFocus('inputPath', rect)} 
                    placeholder="z.B. {{hrworks.output.data}}"
                  />
                </FormGroup>

                {config.operation === 'extract' && (
                  <FormGroup>
                    <Label>Feld-Pfad</Label>
                    <ContextInput
                      value={(config.fieldPath as string) || ''}
                      onChange={(e) => handleConfigChange('fieldPath', e.target.value)}
                      onFocus={(rect) => handleInputFocus('fieldPath', rect)} 
                      placeholder="z.B. id oder person.name"
                    />
                  </FormGroup>
                )}

                {config.operation === 'filter' && (
                  <FormGroup>
                    <Label>Filter-Bedingung (JSONata)</Label>
                    <ContextInput
                      multiline
                      value={(config.filterExpression as string) || ''}
                      onChange={(e) => handleConfigChange('filterExpression', e.target.value)}
                      onFocus={(rect) => handleInputFocus('filterExpression', rect)} 
                      placeholder='status = "active"'
                    />
                  </FormGroup>
                )}

                {config.operation === 'map' && (
                  <FormGroup>
                    <Label>Map-Expression (JSONata)</Label>
                    <ContextInput
                      multiline
                      value={(config.mapExpression as string) || ''}
                      onChange={(e) => handleConfigChange('mapExpression', e.target.value)}
                      onFocus={(rect) => handleInputFocus('mapExpression', rect)} 
                      placeholder='{ "name": firstName & " " & lastName }'
                    />
                  </FormGroup>
                )}

                {(config.operation === 'sum' || config.operation === 'average') && (
                  <FormGroup>
                    <Label>Feld für Berechnung</Label>
                    <ContextInput
                      value={(config.fieldPath as string) || ''}
                      onChange={(e) => handleConfigChange('fieldPath', e.target.value)}
                      onFocus={(rect) => handleInputFocus('fieldPath', rect)} 
                      placeholder="z.B. amount oder salary"
                    />
                  </FormGroup>
                )}
              </>
            )}
          </>
        );

      case 'hrworks':
        const selectedEndpoint = (config.endpoint as string) || '';
        const currentParams = HRWORKS_ENDPOINT_PARAMS[selectedEndpoint] || [];
        const parameters = (config.parameters as Record<string, string>) || {};

        return (
          <>
            <FormGroup>
              <Label>API Endpoint</Label>
              <Select
                value={selectedEndpoint}
                onChange={(e) => {
                  const newEndpoint = e.target.value;
                  updateNodeConfig(selectedNodeId!, {
                    ...config,
                    endpoint: newEndpoint,
                    parameters: {},
                  });
                }}
              >
                <option value="">-- Wählen --</option>
                <optgroup label="Personen">
                  <option value="persons.getAll">Alle Personen abrufen</option>
                  <option value="persons.getById">Person nach ID abrufen</option>
                  <option value="persons.create">Person erstellen</option>
                  <option value="persons.update">Person aktualisieren</option>
                </optgroup>
                <optgroup label="Abwesenheiten">
                  <option value="absences.getAll">Alle Abwesenheiten abrufen</option>
                  <option value="absences.create">Abwesenheit erstellen</option>
                </optgroup>
                <optgroup label="Organisation">
                  <option value="organizationUnits.getAll">Alle OEs abrufen</option>
                  <option value="organizationUnits.getById">OE nach ID abrufen</option>
                </optgroup>
              </Select>
            </FormGroup>
            {selectedEndpoint && currentParams.length > 0 && (
              <>
                <Divider />
                <SectionTitle>Parameter</SectionTitle>
                {currentParams.map((param) => (
                  <FormGroup key={param.name}>
                    <Label>
                      {param.label}
                      {param.required && ' *'}
                    </Label>
                    {param.type === 'select' ? (
                      <Select
                        value={parameters[param.name] || ''}
                        onChange={(e) =>
                          handleConfigChange('parameters', {
                            ...parameters,
                            [param.name]: e.target.value,
                          })
                        }
                      >
                        <option value="">-- Bitte wählen --</option>
                        {param.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <ContextInput
                        type={param.type}
                        value={parameters[param.name] || ''}
                        onChange={(e) =>
                          handleConfigChange('parameters', {
                            ...parameters,
                            [param.name]: e.target.value,
                          })
                        }
                        onFocus={(rect) => handleInputFocus(`parameters.${param.name}`, rect)} 
                        placeholder={`z.B. {{trigger.${param.name}}}`}
                      />
                    )}
                  </FormGroup>
                ))}
              </>
            )}
            {selectedEndpoint && currentParams.length === 0 && (
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                Keine Parameter erforderlich
              </p>
            )}
          </>
        );

      default:
        return <p>Keine Konfigurationsoptionen verfügbar.</p>;
    }
  };

  return (
    <PanelContainer>
      <PanelHeader>
        <PanelTitle>Konfiguration</PanelTitle>
        <CloseButton onClick={() => selectNode(null)}>×</CloseButton>
      </PanelHeader>

      <PanelBody>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" value={label} onChange={handleNameChange} placeholder="Knoten-Name" />
        </FormGroup>

        <Divider />

        <SectionTitle>Einstellungen</SectionTitle>
        {renderConfig()}

        {!nodeType.includes('trigger') && (
          <DeleteButton onClick={handleDelete}>Knoten löschen</DeleteButton>
        )}
      </PanelBody>

      <ContextPanel
        visible={contextPanelVisible}
        onClose={handleCloseContextPanel}
        onSelectVariable={handleSelectVariable}
        currentNodeId={selectedNodeId || undefined}
        position={contextPanelPosition}
      />
    </PanelContainer>
  );
}
