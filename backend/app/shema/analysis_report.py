from pydantic import BaseModel
from typing import Dict, List, Any

class AnalysisReport(BaseModel):
    missing_values: Dict[str, int]
    duplicates: int
    datatype_anomalies: Dict[str, List[Any]]
    outliers: Dict[str, List[float]]
