import smtplib
from email.mime.text import MIMEText
from email.header import Header
import os

email_sender = ['purdueironhacksrobot1@gmail.com']
user_all_path = 'user_all.csv'
user_dict = {}

def configure():
	with open(user_all_path) as user_all_file:
		user_all_reader = csv.reader(user_all_file)
		for row in user_all_reader:
			user_dict[row[34]] = row[35]
 
def send_email(email_content, user):
	sender = 'purdueironhacksrobot1@gmail.com'
	receivers = ['sbrunswi@purdue.edu']
	pwd = 'chizhangmmd'
	 
	mail_msg = email_template
	message = MIMEText(mail_msg, 'html', 'utf-8')
	message['From'] = Header("ironhacks robot1", 'utf-8')
	message['To'] =  Header("bogota_user", 'utf-8')
	 
	subject = 'score from ironhacks'
	message['Subject'] = Header(subject, 'utf-8')
	 
	 
	try:
	    smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
	    smtpObj.ehlo()
	    smtpObj.starttls()
	    smtpObj.login(sender, pwd)
	    smtpObj.sendmail(sender, receivers, message.as_string())
	    print ("{} 邮件发送成功".format(user))
	except smtplib.SMTPException:
		print ("Error: {} 无法发送邮件".format(user))



email_template = '''

<table border="0" cellspacing="1" bgcolor="#dadada">
	<tr bgcolor='F1F1F1'>
		<td>Github Name</td>
		<td>GITHUB_USERNAME</td>
	</tr>
	<tr bgcolor='FFFFFF'>
		<td>General Feedback</td>
		<td>Thanks for submitting your app! We really enjoyed evaluating your application. The feedback below should help you improve your application! It will not influence the score of your final solution, so don't worry!<br>
		We judge your application in four dimensions: Technology, User requirements, InfoVis and Novelty. We judge your application in four dimensions: Technology, User requirements, InfoVis and Novelty. You find your results below. The better you score on each of these dimensions, the higher your chances of winning. </td>
	</tr>
</table>
<br>
<b>Table 1: Your results</b> <br><br>
		<table border="0" cellspacing="1" bgcolor="#dadada">
			<tr bgcolor='F1F1F1'>
				<th >GitHub Name</th>
				<td colspan="1">GITHUB_NAME</td>
				<td colspan="1">Time</td>
				<td colspan="1">JUDGING_TIME</td>
			</tr>
			<tr bgcolor='FFFFFF'>
				<th>Dimension</th>
				<th>Your Results: Description</th>
				<th>Result type</th>
				<th>Your Result</th>
			</tr>
			<tr bgcolor='F1F1F1'>
				<th rowspan="2">Technology</th>
				<td>We evaluate your app in terms of <br>
				(1) Technical errors and<br>
				(2) The successful fulfillment of technology requirements.<br>
				(1) Error rating: We detect errors in your application. <br> Error rating = errors / lines of code in your application</td>
				<td>Error rating</td>
				<td>ERROR_RATING_RAW</td>
			</tr>
			<tr bgcolor='F1F1F1'>
				<td>(2) Tech requirements: You are expected to meet all 8 technological requirements specified in the challenge description (www.ironhacks.com/task). All requirements are equally weighted. You can achieve a score from 0 (no requirement fulfilled) to 100 (all requirements fulfilled).</td>
				<td> Total points for met technology requirements (on a scale from 0 to 100) </td>
				<td>TECH_POINT</td>
			</tr>
			<tr bgcolor='FFFFFF'>
				<th>User requirements</th>
				<td>We evaluate the fulfillment of user requirements specified in the challenge description (www.ironhacks.com/task). You can achieve a score from 0 (no requirement fulfilled) to 100 (all requirements fulfilled). All 5 requirements are equally weighted.</td>
				<td>Total points for met user requirements (on a scale from 0 to 100)</td>
				<td>USER_REQUIREMENT</td>
			</tr>
			<tr bgcolor='F1F1F1'>
				<th>InfoVis</th>
				<td>In the dimension of information visualization (InfoVis) our team of InfoVis experts focuses on three core aspects of information visualization usability: <br>(1) System affordance: Does the application offer recognizable elements and interactions that can be understood by the user? <br>(2) Cognitive workload: Is the number of alternatives from which the user can choose appropriate? <br>(3) Functionality: Would a potential user have to memorize a lot of information and make many steps in the app to carry the task? You can achieve a score from 0 to 100. All three dimensions are equally weighted.</td>
				<td>Total points for information visualization (maximum achievable)</td>
				<td>INFOVIS</td>
			</tr>
			<tr bgcolor='FFFFFF'>
				<th rowspan="2">Novelty</th>
				<td rowspan="2">Adding new data sets definitely makes your app stand (take out the three letters) out from the rest. We evaluate how successfully you implement additional open datasets: <br>(1) Are required datasets used? <br>(2) How relevant are those open datasets? <br>(3)  How well have you implemented them in the app? For the implication score you can achieve a score from 0 to 100. We evaluate each dataset individually and average the score across all datasets that you have used.</td>
				<td>Number of new datasets</td>
				<td>NOVELTY_NUM_DATASETS</td>
			</tr>
			<tr bgcolor='FFFFFF'>
				<td>Total points for implementation of new data sets</td>
				<td>NOVELTY_POINT_OF_DATASETS</td>
			</tr>
		</table>
<br>
<b>Table 2: Summary: Your Percentile Scores</b> <br><br>

Remember, that a percentile rank for a score indicates the percentage of participants who participated in the hack and received a lower score. The percentile ranks for all these four scores are based on the scores of all participants within your hacking group.  
Please visit www.ironhacks.com/results to compare your results with those of others, and see how others with a similar percentile score do in all four dimensions.
<br><br>
		<table border="0" cellspacing="1" bgcolor="#dadada">
			<tr bgcolor='F1F1F1'>
				<td>Dimension</td>
				<td>Technology</td>
				<td>User Requirement</td>
				<td>InfoVis</td>
				<td>Novelty</td>
			</tr>
			<tr bgcolor='FFFFFF'>
				<td>Percentile Score</td>
				<td>TECH_POINT_PER</td>
				<td>USER_REQUIREMENT_PER</td>
				<td>INFOVIS_PER</td>
				<td>NOVELTY_POINT_OF_DATASETS_PER</td>
			</tr>
		</table>


'''


if __name__ == '__main__':
	send_email(email_template, "pengli")
	'''
	configure()
	lists_files = os.walk("html_report")
	for root, dirs, files in list_files:
		for file in files:
			username = file.split('.')[0]
			file = os.path.join(root, file)
			with open(file, 'rt') as f:
				email_content = f.read()
				send_email(email_content, username)
	'''
