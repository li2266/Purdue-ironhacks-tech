import csv
import os
import xlrd
import xlwt
import time

students = {}
tech_judge_file_name = "tech_judge_result.csv"
error_rating_result_file = 'bug_detection_result.csv'
tech_score_index = [4, 5, 7, 8 ,9, 10, 11, 12, 13, 14]
tech_score_dataset_index = 6
ux_score_path = "ux_score"
user_requirement_row_index = [7, 8, 9, 10, 11]
user_requirement_col_index = 4
usability_row_index = [13, 14, 15, 16, 17, 18]
usability_col_index = 4
novelty_row_index = 21
novelty_col_index = [4, 5, 6]
hack_id_index = 1
student_name = 0


class student(object):

	def __init__(self, username, hack_id):
		self.error_rating_raw = 0
		self.error_rating = 0
		self.tech_point = 0
		self.tech_point_raw = 0
		self.user_requirement = 0
		self.infoVis = 0
		self.Novelty_num_datasets = 0
		self.Novelty_point_of_datasets = 0
		self.username = username
		self.hack_id = hack_id

		self.tech_point_per = ""
		self.user_requirement_per = ""
		self.infoVis_per = ""
		self.Novelty_point_of_datasets_per = ""

def parse_grade():
	# create student 
	with open(tech_judge_file_name) as tech_judge_result:
		tech_judge_result_reader = csv.reader(tech_judge_result)
		iter_tech_scores = iter(tech_judge_result_reader)
		next(iter_tech_scores)
		for row in iter_tech_scores:
			# each student!!
			# TODO: error rating
			stu = student(row[student_name], int(row[hack_id_index]))
			for index in tech_score_index:
				stu.tech_point_raw += int(row[index])
			stu.tech_point_raw *= 10;
			datasets = row[tech_score_dataset_index].split(",")
			stu.Novelty_num_datasets = len(datasets) - 1
			students[stu.username] = stu
	# TODO read error rating score
	with open(error_rating_result_file) as error_file:
		error_reader = csv.reader(error_file)
		for row in error_reader:
			students[row[0]].error_rating_raw = row[1]
			students[row[0]].error_rating = 100 * (1 - row[1])
			students[row[0]].tech_point = (students[row[0]].tech_point_raw + students[row[0]].error_rating) / 2
	# TODO create normalized score and combine tech score

	# read score
	list_scores = os.walk(ux_score_path)
	for root, dirs, files in list_scores:
		for file in files:
			file = os.path.join(root, file)
			workbook = xlrd.open_workbook(file)
			for sheet_name in workbook.sheet_names:
				sheet = workbook.sheet_by_name(sheet)
				username = sheet.cell(2, 2).value
				# user requirements
				for row_index in user_requirement_row_index:
					students[username].user_requirement += int(sheet.cell(row_index, user_requirement_col_index).value)
				students[username].user_requirement *= 20

				# usability
				for row_index in usability_row_index:
					students[username].infoVis += int(sheet.cell(row_index, usability_col_index).value)
				students[username].infoVis = students[username].infoVis / 18 * 100

				# novelty
				total_score_dataset = 0
				for row_index in range(novelty_row_index, novelty_row_index + students[username].Novelty_num_datasets):
					for col_index in novelty_col_index:
						total_score_dataset += 3
						students[username].Novelty_point_of_datasets += int(sheet.cell(row_index, col_index).value)
				students[username].Novelty_point_of_datasets = int(students[username].Novelty_point_of_datasets / total_score_dataset * 100)
	# calculate percentile 
	total_size = len(students)
	for username in students:
		tech_lower_than_me = 0
		user_lower_than_me = 0
		infovis_lower_than_me = 0
		data_lower_than_me = 0
		for tmp in students:
			if students[tmp].tech_point <= students[username].tech_point:
				tech_lower_than_me += 1
			if students[tmp].user_requirement <= students[username].user_requirement:
				user_lower_than_me += 1
			if students[tmp].infoVis <= students[username].infoVis:
				infovis_lower_than_me += 1
			if students[tmp].Novelty_point_of_datasets <= students[username].Novelty_point_of_datasets:
				data_lower_than_me += 1
		students[username].tech_point_per = str(round(100 * tech_lower_than_me / total_size, 2)) + '%'
		students[username].user_requirement_per = str(round(100 * user_lower_than_me / total_size, 2)) + '%'
		students[username].infoVis_per = str(round(100 * infovis_lower_than_me / total_size, 2)) + '%'
		students[username].Novelty_point_of_datasets_per = str(round(100 * data_lower_than_me / total_size, 2)) + '%'


def create_individual_report():
	os.chdir('html_report')
	for key in students:
		stu = students[key]
		# insert score
		tmp = table_template_without_per
		tmp = tmp.replace("ERROR_RATING_RAW", str(stu.error_rating_raw), 1)
		tmp = tmp.replace("TECH_POINT", str(stu.tech_point_raw), 1)
		tmp = tmp.replace("USER_REQUIREMENT", str(stu.user_requirement), 1)
		tmp = tmp.replace("INFOVIS", str(stu.infoVis), 1)
		tmp = tmp.replace("NOVELTY_NUM_DATASETS", str(stu.Novelty_num_datasets), 1)
		tmp = tmp.replace("NOVELTY_POINT_OF_DATASETS", str(stu.Novelty_point_of_datasets), 1)
		tmp = tmp.replace("GITHUB_NAME", stu.username)
		tmp = tmp.replace("GITHUB_USERNAME", stu.username)
		tmp = tmp.replace("JUDGING_TIME", str(time.asctime(time.localtime(time.time()))))

		if stu.hack_id == 2:
			tmp += table_template_per_only
			tmp = tmp.replace("TECH_POINT_PER", stu.tech_point_per, 1)
			tmp = tmp.replace("USER_REQUIREMENT_PER", stu.user_requirement_per, 1)
			tmp = tmp.replace("INFOVIS_PER", stu.infoVis_per, 1)
			tmp = tmp.replace("NOVELTY_POINT_OF_DATASETS_PER", stu.Novelty_point_of_datasets_per, 1)
		
		with open(str(stu.username) + ".report", "w") as f:
			tmp = '<html>' + tmp + '</html>'
			f.write(tmp)
	os.chdir('..')

table_template = '''
<html>
Feedback Table <br>
		<table border="1">
			<tr>
				<th>GitHub Name</th>
				<td colspan="1">GITHUB_NAME</td>
				<td colspan="1">Time</td>
				<td colspan="2">JUDGING_TIME</td>
			</tr>
			<tr>
				<th rowspan="2">General feedback</th>
				<td colspan="4">Thanks for submitting your app! We really enjoyed evaluating you application. The feedback below should help you to improve your application! It will not influence the score of your final solution, so don't worry!</td>
			</tr>
			<tr>
				<td colspan="4">We judge your application in four dimensions: Technology, User requirements, InfoVis and Novelty. You find your results below. The better you score on each of these dimensions, the higher your changes of winning. </td>
			</tr>
			<tr>
				<th>Dimension</th>
				<th colspan="2">Description</th>
				<th>Your results</th>
				<th>Your Percentile Score</th>
			</tr>
			<tr>
				<th rowspan="2">Technology</th>
				<td rowspan="2">We evaluate your app in terms of (1) technical errors and the successful achievement of technology requirements. 
(1) Error rating: We differentiate three types of errors: Major errors that prevent the application from working properly, moderate errors that impede the application from being fully functional, and minor errors that are rather 'cosmetic'. We present a total error rating, in which we weight major errors with 3, moderate errors with 2, and minor errors with 1. The lower the error rating the worse your performance (the more errors are in your application). 
(2) Tech requirements: You are expected to meet all 9 technological requirements specified in the challenge description (www.ironhacks.com). All requirements are equally weighted. </td>
				<td> Error rating (negative)</td>
				<td>ERROR_RATING_RAW</td>
				<td rowspan="2">TECH_POINT_PER</td>
			</tr>
			<tr>
				<td> Total points for met technology requirements (on a scale from 0 to 100) </td>
				<td>TECH_POINT</td>
			</tr>
			<tr>
				<th>User requirements</th>
				<td>We evaluate the fullfillment of user requirements specified in the challenge description (www.ironhacks.com/task).</td>
				<td>Total points for met user  requirements (on a scale from 0 to 100)</td>
				<td>USER_REQUIREMENT</td>
				<td>USER_REQUIREMENT_PER</td>
			</tr>
			<tr>
				<th>InfoVis</th>
				<td>In the dimension of infovis our team of info vis experts focuses on three core aspects of information visualization usability: System affordance: Does the application offer recognizable elements and interactions that can be understood by the user? Cognitive workload: Is the number of alternatives from which the user can choose appropriate? Would a potential user have to memorize a lot of information to carry the task? You can achieve a score from 0 to 100. All trhee dimensions are equally weighted. </td>
				<td>Total points for information visualization (maximum achievable)</td>
				<td>INFOVIS</td>
				<td>INFOVIS_PER</td>
			</tr>
			<tr>
				<th rowspan="2">Novelty</th>
				<td rowspan="2">Adding new data sets definitely makes your app standing out from the rest. We evaluate how successfully you implement those open data: How relevant are those open datasets?  How well was the implementation executed in the app?  For the implication score you can achieve a score from 0 to 100. We evaluate each datasets individually and then average score across all datasets that you use. </td>
				<td>Number of new datasets</td>
				<td>NOVELTY_NUM_DATASETS</td>
				<td rowspan="2">NOVELTY_POINT_OF_DATASETS_PER</td>
			</tr>
			<tr>
				<td>Total points for implementation of new data sets</td>
				<td>NOVELTY_POINT_OF_DATASETS</td>
			</tr>
		</table>
</html>
'''


table_template_without_per = '''

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

'''

table_template_per_only = '''
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
	parse_grade()
	create_individual_report()