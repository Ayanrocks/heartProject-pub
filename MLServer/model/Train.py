import numpy as np
import pandas as pd
import math
from sklearn.metrics import accuracy_score
from sklearn import model_selection
from sklearn.model_selection import train_test_split, KFold
from sklearn.linear_model import LogisticRegression


# logisticRegrModel = LogisticRegression(solver="liblinear")


def train():
    global logisticRegrModel
    df = pd.DataFrame(pd.read_csv("train.csv"))
    # df2=pd.DataFrame(pd.read_csv("test.csv"))
    x_train = df.drop(['target'], axis=1)
    y_train = df['target']
    # x_test=df2.drop(['target'],axis=1)
    # y_test=df2['target']
    logisticRegrModel = LogisticRegression(solver="liblinear")
    logisticRegrModel.fit(x_train, y_train)
    # y_pred_lgr=(logisticRegrModel.predict(x_test))
    # score_lgr=(accuracy_score(y_test,y_pred_lgr))
    # print(score_lgr)
    return logisticRegrModel


def test(inp):
    real_value = np.array(inp)
    real_value = real_value.reshape(1, -1)
    real_result = logisticRegrModel.predict(real_value)
    return real_result
