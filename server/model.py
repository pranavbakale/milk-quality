from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pandas as pd
import numpy as np
import pickle
# Load the dataset
df = pd.read_csv('milknew.csv')

# Drop rows with missing values
df.dropna(inplace=True)

# Convert non-numeric values in the target variable 'Grade' to numeric
grade_mapping = {'low': 0, 'medium': 1, 'high': 2}
df['Grade'] = df['Grade'].map(grade_mapping)

# Define features and target variable
X = df.drop('Grade', axis=1)
y = df['Grade']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)

# Train base models
rf_model = RandomForestClassifier()
svm_model = SVC()

rf_model.fit(X_train, y_train)
svm_model.fit(X_train, y_train)

# Generate predictions from base models
rf_predictions = rf_model.predict(X_test)
svm_predictions = svm_model.predict(X_test)

# Create a new dataset with base model predictions as features
X_stacked = np.column_stack((rf_predictions, svm_predictions))

# Split the stacked dataset into training and testing sets
X_train_stacked, X_test_stacked, y_train_stacked, y_test_stacked = train_test_split(X_stacked, y_test, test_size=0.4, random_state=40)

# Train a meta-model (e.g., logistic regression) on the stacked dataset
meta_model = LogisticRegression()
meta_model.fit(X_train_stacked, y_train_stacked)

# Make predictions using the meta-model
meta_predictions = meta_model.predict(X_test_stacked)

# Evaluate the ensemble model
accuracy = accuracy_score(y_test_stacked, meta_predictions)
print("Ensemble Model Accuracy:", accuracy)

with open('ensemble_model.pkl', 'wb') as f:
    pickle.dump((rf_model, svm_model, meta_model, accuracy ), f)